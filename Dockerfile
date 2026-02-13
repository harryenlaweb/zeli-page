# Usa una imagen base de Apache con PHP
FROM php:apache

# Copia todo el contenido de la carpeta 'page' al contenedor
COPY ./page /var/www/html/page

# Configura Apache para que use '/var/www/html/page' como raíz del servidor
RUN echo 'DocumentRoot "/var/www/html/page"' > /etc/apache2/sites-available/000-default.conf \
    && echo '<Directory "/var/www/html/page">' >> /etc/apache2/sites-available/000-default.conf \
    && echo '    Options Indexes FollowSymLinks' >> /etc/apache2/sites-available/000-default.conf \
    && echo '    AllowOverride All' >> /etc/apache2/sites-available/000-default.conf \
    && echo '    Require all granted' >> /etc/apache2/sites-available/000-default.conf \
    && echo '</Directory>' >> /etc/apache2/sites-available/000-default.conf

# Instala dependencias necesarias para PHPMailer y otras herramientas
RUN apt-get update && apt-get install -y \
    zip \
    unzip \
    git \
    libzip-dev \
    libssl-dev \
    libcurl4-openssl-dev \
    zlib1g-dev \
    && docker-php-ext-install zip mysqli pdo pdo_mysql

# Instala Composer para gestionar PHPMailer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Instala las dependencias de PHP necesarias en el proyecto (si tienes un composer.json)
WORKDIR /var/www/html
RUN composer require phpmailer/phpmailer

# Asegúrate de que Apache está configurado para procesar PHP
RUN a2enmod rewrite

# Expone el puerto 80
EXPOSE 80
