# Use the official MongoDB image
FROM mongo:latest

# Set environment variables
ENV MONGO_INITDB_DATABASE=ecommerceDB
ENV MONGO_INITDB_ROOT_USERNAME=admin
ENV MONGO_INITDB_ROOT_PASSWORD=password

# Copy the initialization script
COPY init-mongo.js /docker-entrypoint-initdb.d/

# Expose port 27017
EXPOSE 27017
