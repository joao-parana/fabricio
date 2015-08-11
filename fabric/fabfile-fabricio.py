from fabric.api import *

def deploy():
    fabricio_work_dir = "/tmp/fabricio-workdir";
    fabricio_unzip_dir = "/tmp/fabricio-unzip"
    fabricio_app_dir = fabricio_work_dir + "/fabricio"

    fabfile_dir = fabricio_work_dir + "/fabfile"

    dockerfile_path = fabricio_work_dir + "/Dockerfile"

    last_successful_build_url = "http://localhost:8080/job/fabricio/lastSuccessfulBuild/artifact/*zip*/archive.zip"
    archive_zip_path = "/tmp/archive.zip"

    run("rm -rf " + fabricio_unzip_dir)
    run("rm -rf " + fabricio_work_dir)
    run("mkdir " + fabricio_work_dir)

    run("wget " + last_successful_build_url + " -O " + archive_zip_path)

    run("unzip " + archive_zip_path + " 'archive/*' -d " + fabricio_unzip_dir)
    run("mv /tmp/fabricio-unzip/archive/ " + fabricio_app_dir)

    run("mkdir " + fabfile_dir)
    run("cp /tmp/fabfile.py " + fabfile_dir)

    run("echo 'FROM fabricio/fabricio-runtime' >> " + dockerfile_path)
    run("cd " + fabricio_work_dir + "&& docker build -t fabricio/app .")
    run("docker run -d -p 1337:1337 fabricio/app")
