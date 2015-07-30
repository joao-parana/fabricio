from fabric.api import run

def foo():
    run('uname -s')

def bar():
    run('uname -s')
