from flask import request
import subprocess
import json

cd = "/"

def shell(cmd):
  global cd
  result = subprocess.run(f'cd {cd} && {cmd} && echo "|" && pwd', shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
  rc = result.returncode
  result = result.stdout if not rc else result.stderr
  if rc:
    directory_path = cd
  else:
    directory_path = result.split('|')[-1].strip()
    result = '|'.join(result.split('|')[:-1])
    cd = directory_path
  return result, directory_path, rc

def setup_interface(app):
  @app.route('/command', methods=['POST'])
  def api_command():
    data = json.loads(request.data.decode('utf-8'))
    output, path, rc = shell(data['command'])
    return {
      'output': output,
      'path': path,
      'error': bool(rc)
    }
