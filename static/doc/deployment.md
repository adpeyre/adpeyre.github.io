# Launching a deployment

## From your desktop

The following command allows you to launch the deployment on remote server(s)

```bash
php automate.phar deploy development master
```

```bash
php automate.phar deploy ‹platform› [gitref] -c [path_of_config_file]
```

 - **platform**

The target platform name (e.g. development)

 - **gitref (optional)**

The branch, the tag, or the commit to be deployed.
By default Automate will use the « default_branch » in the configuration file

 - **-c [path_of_config_file] (optional)**

By default, Automate will search for the file `.automate.yml` in the current directory. You can specify it with the option ` -c /path/to/.automate.yml `

## From the target server

The following command allows you to launch the deployment on localy server 

```bash
php automate.phar run /home/wwwroot master
```

```bash
php automate.phar run ‹path› [gitref] -c [path_of_config_file]
```

 - **path**

The path to deploy the project localy

## Automatically from your Gitlab or Travis environment      

It's possible directly in Gitlab or Travis only to lunch automatically Automate after each `git push` or `merge request`.

For Gitlab, just add the file `.gitlab-ci.yml` in the root path of your project.

```YAML
stages:
  - ...
  - deploy

deploy:development:
  stage: deploy
  image: "php"                                 #Use the right Docker container image you need
  only:
    - master
  script:
    - "php automate.phar deploy development"   #Lunch the job !
  environment:
    name: development
    url: http://prod-1.exemple.com
```