from fabric.api import *

fabricio_work_dir = "/tmp/fabricio-workdir";
fabricio_unzip_dir = "/tmp/fabricio-unzip"
fabricio_app_dir = fabricio_work_dir + "/fabricio"

fabfile_dir = fabricio_work_dir + "/fabfile"

dockerfile_path = fabricio_work_dir + "/Dockerfile"

archive_zip_path = "/tmp/archive.zip"

@task
def deploy(build_number='lastSuccessfulBuild'):
    cleanup()

    download_latest(build_number)

    prepare_fabfile()

    remove_old_container_if_necessary()

    run_docker_container()

def cleanup():
    run("rm -rf " + fabricio_unzip_dir)
    run("rm -rf " + fabricio_work_dir)
    run("mkdir " + fabricio_work_dir)
    run("mkdir " + fabfile_dir)

def download_latest(build_number):
    build_url = "http://localhost:8080/job/fabricio/" + build_number + "/artifact/*zip*/archive.zip"
    
    run("wget " + build_url + " -O " + archive_zip_path)
    run("unzip " + archive_zip_path + " 'archive/*' -d " + fabricio_unzip_dir)
    run("mv /tmp/fabricio-unzip/archive/ " + fabricio_app_dir)

def prepare_fabfile():
    run("cp /tmp/fabfile.py " + fabfile_dir)

def run_docker_container():
    run("echo 'FROM fabricio/fabricio-runtime' >> " + dockerfile_path)
    run("cd " + fabricio_work_dir + "&& docker build -t fabricio/app .")
    run("docker run -d -p 1337:1337 --name fabricio fabricio/app")

def remove_old_container_if_necessary():
    with settings(warn_only=True):
        result = run("docker ps -a | grep fabricio")
        if result.return_code != 0:
            pass
        else:
            run("docker rm -f fabricio")
