from fabric.api import *

fabricio_work_dir = "/tmp/fabricio-workdir";
fabricio_unzip_dir = "/tmp/fabricio-unzip"
fabricio_app_dir = fabricio_work_dir + "/fabricio"

fabfile_dir = fabricio_work_dir + "/fabfile"

dockerfile_path = fabricio_work_dir + "/Dockerfile"

last_successful_build_url = "http://localhost:8080/job/fabricio/lastSuccessfulBuild/artifact/*zip*/archive.zip"
archive_zip_path = "/tmp/archive.zip"

@task
def deploy():
    cleanup()

    download_latest()

    prepare_fabfile()

    run_docker_container()

def cleanup():
    run("rm -rf " + fabricio_unzip_dir)
    run("rm -rf " + fabricio_work_dir)
    run("mkdir " + fabricio_work_dir)
    run("mkdir " + fabfile_dir)

def download_latest():
    run("wget " + last_successful_build_url + " -O " + archive_zip_path)
    run("unzip " + archive_zip_path + " 'archive/*' -d " + fabricio_unzip_dir)
    run("mv /tmp/fabricio-unzip/archive/ " + fabricio_app_dir)

def prepare_fabfile():
    run("cp /tmp/fabfile.py " + fabfile_dir)

def run_docker_container():
    run("echo 'FROM fabricio/fabricio-runtime' >> " + dockerfile_path)
    run("cd " + fabricio_work_dir + "&& docker build -t fabricio/app .")
    run("docker run -d -p 1337:1337 fabricio/app")
