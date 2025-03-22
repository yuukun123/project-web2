FROM php:8.2-apache

# Cài thêm driver mysqli để kết nối MySQL
RUN docker-php-ext-install mysqli && docker-php-ext-enable mysqli

# Copy mã nguồn vào container
COPY . /var/www/html/

# Kích hoạt mod_rewrite
RUN a2enmod rewrite

# Set quyền truy cập
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html
