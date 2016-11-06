import ConfigParser
import sqlite3
from flask import Flask, request, session, g, redirect, url_for, render_template, flash

app = Flask(__name__)

# Database
conn = sqlite3.connect('database/gpi.db')
c =  conn.cursor()
# c.execute('SELECT * FROM users')
# data = c.fetchall() #single fetchone()
# print(data)
# for row in c.fetchall():
    # print(row)


# Routes
@app.errorhandler(404)
def page_not_found(error):
    return render_template('404.html')

@app.errorhandler(401)
def unauthorized(error):
    return render_template('401.html')

@app.route('/')
def root():
    return render_template('index.html')

@app.route('/login', methods=['POST', 'GET'])
def login():
    if request.method=='POST':
        email = request.form['email']
        password = request.form['password']
        #c.execute('SELECT email, password FROM users')
        #c.execute('SELECT email, password FROM users WHERE email=? AND password =?', email, password)
        data = 0 #c.fetchone()
        if data:
            return render_template('login.html', data=data)
    else:
        return render_template('login.html')


# Configuration
def init(app):
  config = ConfigParser.ConfigParser()
  try:
      config_location = "etc/default.cfg"
      config.read(config_location)

      app.config['DEBUG'] = config.get("config", "debug")
      app.config['ip_address'] = config.get("config", "ip_address")
      app.config['port'] = config.get("config", "port")
      app.config['url'] = config.get("config", "url")

  except:
      print "Could not read configs from: ", config_location

if __name__ == "__main__":
  init(app)
  app.run(
          host = app.config['ip_address'],
          port = int(app.config['port'])
          )
