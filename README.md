# Pluma

![Image](https://github.com/EdgarModesto23/pluma-client/blob/main/Plumadashboard.png)

## Description
Pluma is a reactive and collaborative note-taking web application that aims to simplify the process of taking notes with your friends and colleagues!.


## ⚡ Quick start

The main concepts of Pluma are **Boards** and **Notes**.
- Boards are the "containers" of your notes. You can add as many notes as you want and you can even invite people to join to a particular board so that they are able to see and edit any notes in it!.
- Notes are bounded to the specific board you create them in. Simply create one and enjoy the richfull text editor courtesy of QuillJS.

To get started. Simply create yourself an account on the official page present in this repository. and you'll be redirected to the main dashboard.

- Once you're in. You can start by creating a board on the side panel and giving it a name.
- Then, head over to your new board and start adding notes using the buttons on the right!


## ⚙ Installation
> Pluma is a fullstack web application, so you are expected to install the specific API in conjunction of this client. You can check the API [repository here.](https://github.com/EdgarModesto23/Pluma-backend)

To install pluma into your local machine, you'll have to install both the API and the client of the app:

```bash
git clone https://github.com/EdgarModesto23/pluma-client.git

cd pluma-client
npm install
```
Once installed, you'll need to create a .env file in the root of the directory and define a variable called "VITE_API_URL" with the address your Django server. (Which by default is localhost:8000).

You can then proceed to install the API locally to finish setting up our development server.

## API installation

### Linux
```bash
git clone https://github.com/EdgarModesto23/pluma-api.git

cd pluma-api
python -m venv .venv
source ./.venv/bin/activate
python -m pip install -r requirements.txt

python manage.py migrate
python manage.py runserver
```

### Windows
```bash
git clone https://github.com/EdgarModesto23/pluma-api.git

cd pluma-api
python -m venv .venv

.\.venv\Scripts\activate
python -m pip install -r requirements.txt


python manage.py migrate
python manage.py runserver
```

## 💬 Contact
+ [Linkedin](https://www.linkedin.com/in/edgarmodesto23)

Submit an issue (above in the issues tab)


