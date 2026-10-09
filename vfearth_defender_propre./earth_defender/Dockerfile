# Serveur web Apache qui ne contient QUE ce qui est nécessaire au jeu
# (pas de src/, pas de node_modules, pas de package.json...).
# Avant : tsc (compile src/ vers build/)
FROM httpd:2.4-alpine
COPY index.html /usr/local/apache2/htdocs/
COPY build/ /usr/local/apache2/htdocs/build/
COPY public/ /usr/local/apache2/htdocs/public/
EXPOSE 80
