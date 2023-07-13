# We use the basic Node.js image to build the application
FROM node:18.16-alpine AS builder

WORKDIR /app

# Copy the dependency files and install them
COPY package.json /app/package.json
RUN yarn install

# Copy all the source code of the application
COPY . /app

# Collecting the application
RUN yarn build

# We use the base image of Nginx to launch the application
FROM nginx:alpine

# Copy the compiled application to Nginx
COPY --from=builder /app/build /usr/share/nginx/html

# Copy Nginx settings
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# We indicate on which port Nginx will work
EXPOSE 80

# The command to run Nginx
CMD ["nginx", "-g", "daemon off;"]