from flask import Flask, request
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from flask_cors import CORS, cross_origin
import base64


app = Flask(__name__)
CORS(app)
def sendmailtome(who,contenumail, tel):
    print("me")
    # Définissez les informations de base
    expediteur = 'guillaumelechevalliercv@gmail.com'
    mot_de_passe = 'exemplemotdepasse'
    destinataire = 'moilechevallier@gmail.com'
    sujet = "on t'as contacté par mail !"

    # Écrivez votre message HTML ici
    html = """\
    <html>
      <head></head>
      <body>
        <h2>Bonjour Guillaume !</h2>
        <div><h1>"""+who+"""</h1><p>T'as envoyé un message</p></div><br><br>
        <div><h1>"""+tel+"""</h1><p>Est son numéro de téléphone</p></div><br><br>
        <p>C'est celui ci :</p>
        <h2>"""+contenumail+"""
        </h2>
        <p>le mail à été envoyé à l'instant, et de son coté, la personne aussi à reçu un mail de confirmation comme quoi tu as reçu un mail</p>
      </body>
    </html>
    """

    # Créez un message MIME
    message = MIMEMultipart()
    message['From'] = expediteur
    message['To'] = destinataire
    message['Subject'] = sujet

    # Attachez le corps HTML au message
    message.attach(MIMEText(html, 'html'))

    # Connectez-vous au serveur SMTP et envoyez l'email
    try:
        # Créez une session SMTP
        session = smtplib.SMTP('smtp.gmail.com', 587)  # Remplacez par l'adresse du serveur SMTP et le port
        session.starttls()  # Sécurisez la connexion
        session.login(expediteur, mot_de_passe)

        # Envoyez l'email
        session.sendmail(expediteur, destinataire, message.as_string())
        print("Email envoyé avec succès!")
    except Exception as e:
        print(f"Erreur lors de l'envoi de l'email: {e}")
    finally:
        session.quit()

def sendmailtohim(destinataire,contenumail,numerotel):
    print("him")
    # Définissez les informations de base
    expediteur = 'guillaumelechevalliercv@gmail.com'
    mot_de_passe = 'g b a e x v v i s ob e j u r y'
    destinataire = destinataire
    sujet = "J'ai bien reçu votre demande !"
    if len(numerotel) == 0:
        phone = """<p class="explication">Vous n'avez pas renseigné de numéro de téléphone.</p><br><p class="explication">Si c'est parce que vous avez oublié, je vous invite à me renvoyer une demande</p><br>
"""
    else:
        phone = """<p class="explication">Juste pour confirmer afin que je puisse vous recontacter, <strong>"""+numerotel+"""</strong> est votre numéro de téléphone.</p><br><p class="explication">Si ce n'est pas le cas, je vous invite à me renvoyer une demande</p><br>"""

    # Écrivez votre message HTML ici
    html = """\
    <html>
      <head><style>
  body { }
.titre{
  color: white;
  font-size: 200%;
  margin-left: 0 2%;
}
.explication{
  font-family: Roboto, Helvetica Neue, sans-serif;
  font-size: 120%;
  color:white;
  margin: 0 2%;
  width: 80%;
  max-width: 80%;
}
.signature{  font-family: Roboto, Helvetica Neue, sans-serif;
  font-size: 120%;
  color:white;
  margin: 0 2%;
  width: 80%;
  max-width: 80%;
  text-align:right;}

.allall{margin: 0 0; font-family: Roboto, "Helvetica Neue", sans-serif;
  background-color: #CCCCCC}
.all{
  margin: 0 10%; font-family: Roboto, "Helvetica Neue", sans-serif;
  background: linear-gradient(to bottom right, #0d1642, #01A5F6) fixed no-repeat padding-box;
}
</style></head>
<body>
<div class="allall">
<div class="all">
<br>
<p class="explication">Bonjour</p><br>
<p class="explication">J'ai bien reçu votre demande et je vous remercie pour l'interet que vous me portez.</p>
<p class="explication">Je reviendrai vers vous au plus vite dans le cas où cela se rapporterait à une demande d'embauche.</p>"""+phone+"""
<p class="explication">En attendant, je vous souhaite une bonne journée !</p><br>
<p class="signature">Lechevallier Guillaume</p><br>
  </div>
  </div>
</body>


    </html>


    """

    # Créez un message MIME
    message = MIMEMultipart()
    message['From'] = expediteur
    message['To'] = destinataire
    message['Subject'] = sujet

    # Attachez le corps HTML au message
    message.attach(MIMEText(html, 'html'))

    # Connectez-vous au serveur SMTP et envoyez l'email
    try:
        # Créez une session SMTP
        session = smtplib.SMTP('smtp.gmail.com', 587)  # Remplacez par l'adresse du serveur SMTP et le port
        session.starttls()  # Sécurisez la connexion
        session.login(expediteur, mot_de_passe)

        # Envoyez l'email
        session.sendmail(expediteur, destinataire, message.as_string())
        print("Email envoyé avec succès!")
    except Exception as e:
        print(f"Erreur lors de l'envoi de l'email: {e}")
    finally:
        session.quit()








@app.route('/sendmail',methods=['GET', 'OPTIONS'])
@cross_origin()

def hello():
    # Récupération des valeurs d'en-tête
    mail = request.headers.get('mail')
    contenu = request.headers.get('contenu')
    phone = request.headers.get('phone')
    print(type(phone))
    if type(phone) != type("hello"):
        phone = ""
    if type(contenu) != type("hello"):
        contenu = ""
    if type(mail) != type("hello"):
        mail = ""

    # Affichage des valeurs d'en-tête
    contenu = str(base64.b64decode(contenu))
    contenu = contenu[2:]
    contenu = contenu[:-1]
    contenu = contenu.replace("\\n","<br>")
    print(f"Valeur de mail: {mail}")
    print(f"Valeur de contenu: {contenu}")
    print(f"Valeur de telephone: {phone}")

    if mail=="":
        return """{"response" : "Renseignez un mail"}"""
    elif not '@' in mail:
        return """{"response" : "Mail non valide"}"""
    else:
        sendmailtome(mail,contenu, phone)
        sendmailtohim(mail,contenu,phone)

        return """{"response" : "Envoyé !"}"""



