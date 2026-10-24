(function () {
  function onReady(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn, { once: true });
    } else {
      fn();
    }
  }

  function initMarketingGrid() {
    var backdrop = document.querySelector('.sa-growth > .sa-grid-backdrop, [data-sa-grid-backdrop="true"]');
    if (!backdrop || backdrop.getAttribute('data-sa-grid-ready') === 'true') {
      return;
    }

    backdrop.setAttribute('data-sa-grid-ready', 'true');

    var reveals = document.querySelectorAll('.sa-reveal');
    var dots = backdrop ? Array.prototype.slice.call(backdrop.querySelectorAll('.sa-grid-dot')) : [];
    var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var svgNS = 'http://www.w3.org/2000/svg';
    var connectionLayer = null;
    var connectionDefs = null;
    var linePool = [];
    var states = [];
    var maxDots = 40;
    var maxLinksPerDot = 4;
    var dotPalette = [
      {
        name: 'blue',
        color: '#2450b1',
        glow: 'rgba(36, 80, 177, 0.18)'
      },
      {
        name: 'pink',
        color: '#eb168a',
        glow: 'rgba(235, 22, 138, 0.18)'
      }
    ];

    function readGridSize() {
      if (!backdrop) {
        return 70;
      }

      var lines = backdrop.querySelector('.sa-grid-lines');
      if (!lines) {
        return 70;
      }

      var size = window.getComputedStyle(lines).backgroundSize.split(' ')[0];
      var parsed = parseFloat(size);
      return Number.isFinite(parsed) && parsed > 0 ? parsed : 70;
    }

    function randomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function clamp(value, min, max) {
      return Math.min(max, Math.max(min, value));
    }

    function shuffle(list) {
      for (var i = list.length - 1; i > 0; i -= 1) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = list[i];
        list[i] = list[j];
        list[j] = temp;
      }

      return list;
    }

    function buildAnchors(bounds, count) {
      var columns = Math.max(6, bounds.maxX - bounds.minX);
      var rows = Math.max(6, bounds.maxY - bounds.minY);
      var rawAnchors = [
        { x: 2, y: 2 },
        { x: 4, y: 3 },
        { x: 7, y: 2 },
        { x: 9, y: 4 },
        { x: 3, y: 6 },
        { x: 6, y: 7 },
        { x: 9, y: 7 },
        { x: 11, y: 5 }
      ];

      return rawAnchors.slice(0, Math.max(1, Math.ceil(count / 2))).map(function (anchor) {
        return {
          x: clamp(bounds.minX + Math.round((anchor.x / 12) * columns), bounds.minX + 1, bounds.maxX - 1),
          y: clamp(bounds.minY + Math.round((anchor.y / 9) * rows), bounds.minY + 1, bounds.maxY - 1)
        };
      });
    }

    function createConnectionLayer() {
      if (!backdrop) {
        return null;
      }

      var layer = document.createElementNS(svgNS, 'svg');
      layer.setAttribute('class', 'sa-grid-links');
      layer.setAttribute('aria-hidden', 'true');
      layer.setAttribute('preserveAspectRatio', 'none');
      connectionDefs = document.createElementNS(svgNS, 'defs');
      layer.appendChild(connectionDefs);
      backdrop.insertBefore(layer, backdrop.querySelector('.sa-grid-curve'));
      return layer;
    }

    function syncConnectionLayerSize() {
      if (!connectionLayer || !backdrop) {
        return;
      }

      var width = Math.max(1, Math.round(backdrop.clientWidth));
      var height = Math.max(1, Math.round(backdrop.clientHeight));
      connectionLayer.setAttribute('viewBox', '0 0 ' + width + ' ' + height);
      connectionLayer.setAttribute('width', String(width));
      connectionLayer.setAttribute('height', String(height));
    }

    function ensureLine(index) {
      if (linePool[index]) {
        return linePool[index];
      }

      var gradient = document.createElementNS(svgNS, 'linearGradient');
      gradient.setAttribute('id', 'sa-grid-gradient-' + index);
      gradient.setAttribute('gradientUnits', 'userSpaceOnUse');

      var stopStart = document.createElementNS(svgNS, 'stop');
      stopStart.setAttribute('offset', '0%');
      gradient.appendChild(stopStart);

      var stopEnd = document.createElementNS(svgNS, 'stop');
      stopEnd.setAttribute('offset', '100%');
      gradient.appendChild(stopEnd);

      var line = document.createElementNS(svgNS, 'line');
      line.setAttribute('stroke', 'url(#sa-grid-gradient-' + index + ')');

      connectionDefs.appendChild(gradient);
      connectionLayer.appendChild(line);
      linePool[index] = {
        line: line,
        gradient: gradient,
        start: stopStart,
        end: stopEnd
      };
      return linePool[index];
    }

    function hideUnusedLines(fromIndex) {
      for (var i = fromIndex; i < linePool.length; i += 1) {
        linePool[i].line.style.setProperty('opacity', '0', 'important');
      }
    }

    function randomPaletteEntry() {
      return dotPalette[randomInt(0, dotPalette.length - 1)];
    }

    function assignDotColor(dot, paletteEntry) {
      dot.dataset.saColor = paletteEntry.name;
      dot.dataset.saHex = paletteEntry.color;
      dot.style.setProperty('--sa-dot-color', paletteEntry.color, 'important');
      dot.style.setProperty('--sa-dot-glow', paletteEntry.glow, 'important');
    }

    function nextSegmentDuration(baseSpeed) {
      var variance = 0.78 + (Math.random() * 0.5);
      return Math.max(180, baseSpeed * 1000 * variance);
    }

    function buildDotState(dot, index, bounds, anchors) {
      var pairIndex = Math.floor(index / 2);
      var anchor = anchors[pairIndex % anchors.length];
      var pairOffset = index % 2 === 0
        ? { x: -1, y: 0 }
        : { x: 1, y: 0 };
      var horizontalStart = clamp(anchor.x + pairOffset.x, bounds.minX, bounds.maxX);
      var verticalStart = clamp(anchor.y + pairOffset.y, bounds.minY, bounds.maxY);
      var dirs = shuffle(['up', 'right', 'down', 'left']);
      var paletteEntry = randomPaletteEntry();

      dot.style.setProperty('left', String(horizontalStart * bounds.grid) + 'px', 'important');
      dot.style.setProperty('top', String(verticalStart * bounds.grid) + 'px', 'important');
      dot.style.setProperty('right', 'auto', 'important');
      dot.style.setProperty('opacity', '0.96', 'important');
      dot.style.setProperty('transform', 'translate(-50%, -50%)', 'important');
      dot.style.setProperty('transition', 'none', 'important');
      assignDotColor(dot, paletteEntry);

      return {
        dot: dot,
        speed: 0.84 + (index % 5) * 0.12,
        x: horizontalStart,
        y: verticalStart,
        currentX: horizontalStart,
        currentY: verticalStart,
        fromX: horizontalStart,
        fromY: verticalStart,
        targetX: horizontalStart,
        targetY: verticalStart,
        moveStartAt: 0,
        moveDuration: 0,
        baseSpeed: 0.84 + (index % 5) * 0.12,
        anchorX: anchor.x,
        anchorY: anchor.y,
        roam: 2 + (index % 2),
        dir: dirs[0],
      };
    }

    function buildManualDotState(dot, index, bounds, clickX, clickY) {
      var gridX = clamp(Math.round(clickX / bounds.grid), bounds.minX, bounds.maxX);
      var gridY = clamp(Math.round(clickY / bounds.grid), bounds.minY, bounds.maxY);
      var dirs = shuffle(['up', 'right', 'down', 'left']);
      var paletteEntry = randomPaletteEntry();

      dot.style.setProperty('left', String(gridX * bounds.grid) + 'px', 'important');
      dot.style.setProperty('top', String(gridY * bounds.grid) + 'px', 'important');
      dot.style.setProperty('right', 'auto', 'important');
      dot.style.setProperty('opacity', '0.96', 'important');
      dot.style.setProperty('transform', 'translate(-50%, -50%)', 'important');
      dot.style.setProperty('transition', 'none', 'important');
      assignDotColor(dot, paletteEntry);

      return {
        dot: dot,
        speed: 0.82 + (index % 5) * 0.11,
        x: gridX,
        y: gridY,
        currentX: gridX,
        currentY: gridY,
        fromX: gridX,
        fromY: gridY,
        targetX: gridX,
        targetY: gridY,
        moveStartAt: 0,
        moveDuration: 0,
        baseSpeed: 0.82 + (index % 5) * 0.11,
        anchorX: gridX,
        anchorY: gridY,
        roam: 2,
        dir: dirs[0],
      };
    }

    function computeBounds() {
      var grid = readGridSize();
      var columns = Math.max(10, Math.floor(window.innerWidth / grid));
      var rows = Math.max(10, Math.floor(window.innerHeight / grid));

      return {
        grid: grid,
        minX: 1,
        maxX: Math.max(3, columns - 1),
        minY: Math.max(2, Math.round(88 / grid)),
        maxY: Math.max(5, rows - 1),
      };
    }

    function opposite(direction) {
      switch (direction) {
        case 'up':
          return 'down';
        case 'down':
          return 'up';
        case 'left':
          return 'right';
        default:
          return 'left';
      }
    }

    function nextPoint(state, direction) {
      var nextX = state.x;
      var nextY = state.y;

      if (direction === 'up') {
        nextY -= 1;
      } else if (direction === 'down') {
        nextY += 1;
      } else if (direction === 'left') {
        nextX -= 1;
      } else {
        nextX += 1;
      }

      return { x: nextX, y: nextY };
    }

    function inBounds(point, bounds) {
      return point.x >= bounds.minX
        && point.x <= bounds.maxX
        && point.y >= bounds.minY
        && point.y <= bounds.maxY;
    }

    function chooseDirection(state, bounds) {
      var directions = ['up', 'right', 'down', 'left'];
      var valid = directions.filter(function (dir) {
        return inBounds(nextPoint(state, dir), bounds);
      });

      if (!valid.length) {
        return state.dir;
      }

      var distanceFromAnchor = Math.max(
        Math.abs(state.x - state.anchorX),
        Math.abs(state.y - state.anchorY)
      );

      if (distanceFromAnchor >= state.roam) {
        valid = valid.filter(function (dir) {
          var next = nextPoint(state, dir);
          var nextDistance = Math.max(
            Math.abs(next.x - state.anchorX),
            Math.abs(next.y - state.anchorY)
          );

          return nextDistance <= distanceFromAnchor;
        });
      }

      if (valid.indexOf(state.dir) !== -1 && Math.random() < 0.56) {
        return state.dir;
      }

      var preferred = valid.filter(function (dir) {
        return dir !== opposite(state.dir);
      });

      if (preferred.length && Math.random() < 0.8) {
        valid = preferred;
      }

      return valid[randomInt(0, valid.length - 1)];
    }

    function applyState(state, bounds) {
      state.dot.style.setProperty('left', String(state.currentX * bounds.grid) + 'px', 'important');
      state.dot.style.setProperty('top', String(state.currentY * bounds.grid) + 'px', 'important');
    }

    function scheduleNextMove(state, bounds, now) {
      var direction = chooseDirection(state, bounds);
      var point = nextPoint(state, direction);

      if (!inBounds(point, bounds)) {
        direction = chooseDirection(state, bounds);
        point = nextPoint(state, direction);
      }

      if (!inBounds(point, bounds)) {
        return;
      }

      state.dir = direction;
      state.fromX = state.currentX;
      state.fromY = state.currentY;
      state.x = point.x;
      state.y = point.y;
      state.targetX = point.x;
      state.targetY = point.y;
      state.moveStartAt = now;
      state.speed = state.baseSpeed * (0.82 + (Math.random() * 0.46));
      state.moveDuration = nextSegmentDuration(state.speed);
    }

    function stepState(state, bounds, now) {
      if (!state.moveStartAt || !state.moveDuration) {
        scheduleNextMove(state, bounds, now);
      }

      var progress = state.moveDuration > 0
        ? clamp((now - state.moveStartAt) / state.moveDuration, 0, 1)
        : 1;

      state.currentX = state.fromX + ((state.targetX - state.fromX) * progress);
      state.currentY = state.fromY + ((state.targetY - state.fromY) * progress);

      if (progress >= 1) {
        state.currentX = state.targetX;
        state.currentY = state.targetY;
        scheduleNextMove(state, bounds, now);
      }

      applyState(state, bounds);
    }

    function readDotCenters(bounds) {
      if (!backdrop) {
        return [];
      }

      var backdropRect = backdrop.getBoundingClientRect();

      return Array.prototype.map.call(dots, function (dot) {
        var rect = dot.getBoundingClientRect();
        var centerX = (rect.left - backdropRect.left) + (rect.width / 2);
        var centerY = (rect.top - backdropRect.top) + (rect.height / 2);

        return {
          x: centerX,
          y: centerY,
          gridX: centerX / bounds.grid,
          gridY: centerY / bounds.grid,
          color: dot.dataset.saHex || '#2450b1'
        };
      });
    }

    function renderConnections(bounds) {
      if (!connectionLayer) {
        return;
      }

      var centers = readDotCenters(bounds);
      var candidates = [];
      var startDistance = bounds.grid * 3;
      var fullDistance = bounds.grid * 2;
      var bucketSize = startDistance;
      var buckets = new Map();
      var linkCounts = new Map();

      centers.forEach(function (center, index) {
        var bucketX = Math.floor(center.x / bucketSize);
        var bucketY = Math.floor(center.y / bucketSize);
        var key = bucketX + ':' + bucketY;

        center.index = index;
        center.bucketX = bucketX;
        center.bucketY = bucketY;

        if (!buckets.has(key)) {
          buckets.set(key, []);
        }

        buckets.get(key).push(center);
      });

      centers.forEach(function (center) {
        for (var offsetY = -1; offsetY <= 1; offsetY += 1) {
          for (var offsetX = -1; offsetX <= 1; offsetX += 1) {
            var neighborKey = (center.bucketX + offsetX) + ':' + (center.bucketY + offsetY);
            var neighbors = buckets.get(neighborKey);

            if (!neighbors) {
              continue;
            }

            neighbors.forEach(function (other) {
              if (other.index <= center.index) {
                return;
              }

              var dx = other.x - center.x;
              var dy = other.y - center.y;
              var distance = Math.sqrt((dx * dx) + (dy * dy));

              if (distance > startDistance || distance <= 0) {
                return;
              }

              var strength = clamp((startDistance - distance) / (startDistance - fullDistance), 0, 1);
              var centerCount = linkCounts.get(center.index) || 0;
              var otherCount = linkCounts.get(other.index) || 0;

              if (centerCount >= maxLinksPerDot || otherCount >= maxLinksPerDot) {
                return;
              }

              candidates.push({
                startIndex: center.index,
                endIndex: other.index,
                ax: center.x,
                ay: center.y,
                bx: other.x,
                by: other.y,
                startColor: center.color,
                endColor: other.color,
                distance: distance,
                strength: strength,
              });
            });
          }
        }
      });

      candidates.sort(function (first, second) {
        if (second.strength !== first.strength) {
          return second.strength - first.strength;
        }

        return first.distance - second.distance;
      });

      candidates = candidates.filter(function (link) {
        var startCount = linkCounts.get(link.startIndex) || 0;
        var endCount = linkCounts.get(link.endIndex) || 0;

        if (startCount >= maxLinksPerDot || endCount >= maxLinksPerDot) {
          return false;
        }

        linkCounts.set(link.startIndex, startCount + 1);
        linkCounts.set(link.endIndex, endCount + 1);
        return true;
      });

      candidates.forEach(function (link, index) {
        var lineEntry = ensureLine(index);
        var opacity = link.strength < 0.02 ? 0 : (0.04 + (link.strength * 0.92));
        var width = 1.15 + (link.strength * 1.65);

        lineEntry.gradient.setAttribute('x1', link.ax.toFixed(2));
        lineEntry.gradient.setAttribute('y1', link.ay.toFixed(2));
        lineEntry.gradient.setAttribute('x2', link.bx.toFixed(2));
        lineEntry.gradient.setAttribute('y2', link.by.toFixed(2));
        lineEntry.start.setAttribute('stop-color', link.startColor || '#2450b1');
        lineEntry.end.setAttribute('stop-color', link.endColor || '#eb168a');

        lineEntry.line.setAttribute('x1', link.ax.toFixed(2));
        lineEntry.line.setAttribute('y1', link.ay.toFixed(2));
        lineEntry.line.setAttribute('x2', link.bx.toFixed(2));
        lineEntry.line.setAttribute('y2', link.by.toFixed(2));
        lineEntry.line.style.setProperty('opacity', opacity.toFixed(3), 'important');
        lineEntry.line.style.setProperty('stroke-width', width.toFixed(2), 'important');
      });

      hideUnusedLines(candidates.length);
    }

    function startGridMotion() {
      if (!dots.length || !backdrop) {
        return;
      }

      connectionLayer = createConnectionLayer();
      syncConnectionLayerSize();

      var bounds = computeBounds();
      var anchors = buildAnchors(bounds, dots.length);
      states = Array.prototype.map.call(dots, function (dot, index) {
        return buildDotState(dot, index, bounds, anchors);
      });

      window.requestAnimationFrame(function (now) {
        states.forEach(function (state) {
          state.dot.style.setProperty('transition', 'none', 'important');
          state.dot.classList.add('is-active');
          scheduleNextMove(state, bounds, now);
          applyState(state, bounds);
        });
        renderConnections(bounds);
      });

      function animateGrid(now) {
        bounds = computeBounds();
        syncConnectionLayerSize();
        states.forEach(function (state) {
          stepState(state, bounds, now);
        });
        renderConnections(bounds);
        window.requestAnimationFrame(animateGrid);
      }

      if (!reduceMotion) {
        window.requestAnimationFrame(animateGrid);
      } else {
        renderConnections(bounds);
      }

      window.addEventListener('resize', function () {
        bounds = computeBounds();
        syncConnectionLayerSize();
        states.forEach(function (state) {
          state.anchorX = clamp(state.anchorX, bounds.minX + 1, bounds.maxX - 1);
          state.anchorY = clamp(state.anchorY, bounds.minY + 1, bounds.maxY - 1);
          state.x = Math.min(bounds.maxX, Math.max(bounds.minX, state.x));
          state.y = Math.min(bounds.maxY, Math.max(bounds.minY, state.y));
          applyState(state, bounds);
        });
        renderConnections(bounds);
      });
    }

    function createDotAtClick(event) {
      if (!backdrop) {
        return;
      }

      var backdropRect = backdrop.getBoundingClientRect();
      var bounds = computeBounds();
      var clickX = event.clientX - backdropRect.left;
      var clickY = event.clientY - backdropRect.top;

      if (clickX < 0 || clickY < 0 || clickX > backdropRect.width || clickY > backdropRect.height) {
        return;
      }

      var dot = document.createElement('span');
      dot.className = 'sa-grid-dot sa-grid-dot-manual is-active';
      backdrop.querySelector('.sa-grid-curve').appendChild(dot);

      dots.push(dot);

      var state = buildManualDotState(dot, states.length, bounds, clickX, clickY);
      states.push(state);

      window.requestAnimationFrame(function () {
        dot.style.setProperty('transition', 'none', 'important');
      });

      if (states.length > maxDots) {
        var removedState = states.shift();
        var removedDotIndex = dots.indexOf(removedState.dot);

        if (removedDotIndex !== -1) {
          dots.splice(removedDotIndex, 1);
        }

        removedState.dot.remove();
      }

      renderConnections(bounds);
    }

    startGridMotion();
    window.ShopAlerteMarketingGrid = window.ShopAlerteMarketingGrid || {};
    window.ShopAlerteMarketingGrid.addPoint = createDotAtClick;

    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.18 });

      reveals.forEach(function (node) {
        observer.observe(node);
      });
    } else {
      reveals.forEach(function (node) {
        node.classList.add('is-visible');
      });
    }
  }

  window.ShopAlerteMarketingGrid = window.ShopAlerteMarketingGrid || {};
  window.ShopAlerteMarketingGrid.init = initMarketingGrid;
  onReady(initMarketingGrid);
})();


