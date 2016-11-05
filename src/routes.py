import ConfigParser
from flask import Flask, request, session, g, redirect, url_for, render_template, flash

app = Flask(__name__)

# Routes
@app.route('/')
def root():
    return render_template('index.html')


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
