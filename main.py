from interface import setup_interface
from flask import render_template
from interface import cd
from flask import Flask

app = Flask(__name__)
setup_interface(app)

@app.route('/')
def app_index():
  return render_template('index.html', cd=cd)

app.run(host='0.0.0.0', port=8080)
