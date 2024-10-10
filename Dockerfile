FROM php:8.2-apache

WORKDIR /var/www/html/

RUN apt-get update && apt-get install -y --force-yes \
    freetds-dev \
    libicu-dev \
    libpq-dev \
    libpng-dev \
    libzip-dev \
    git \
 && rm -r /var/lib/apt/lists/* \
 && cp -s /usr/lib/x86_64-linux-gnu/libsybdb.so /usr/lib/ \
 && docker-php-ext-configure pdo_mysql --with-pdo-mysql=mysqlnd \
 && docker-php-ext-install \
    gd \
    pcntl \
    pdo_dblib \
    pdo_mysql \
    pdo_pgsql \
    zip

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN curl -fsSL https://deb.nodesource.com/setup_20.x -o nodesource_setup.sh

RUN a2enmod rewrite

RUN bash nodesource_setup.sh && apt-get install -y nodejs

COPY virtualhost.conf /etc/apache2/sites-enabled/000-default.conf

COPY . .

RUN chown www-data:www-data /var/www -R ./storage

RUN composer install --no-dev --prefer-dist --no-autoloader --no-scripts

RUN chmod o+w storage -R
RUN chmod o+w bootstrap/cache -R
RUN composer dump-autoload
RUN npm install && npm run build

EXPOSE 80
