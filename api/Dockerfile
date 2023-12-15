 # Use an official Node.js runtime as the base image
FROM node:latest

# Set the working directory inside the container
WORKDIR /usr/src/app

# # Copy package.json and package-lock.json from the parent directory to the working directory
#  COPY package*.json .
# Copy package.json and package-lock.json to a directory in the container
COPY package*.json /usr/src/app/


# Install dependencies
RUN npm install

# Copy the backend source code to the container
COPY . .

# Expose the port your app runs on
EXPOSE 3001

# Define the command to run your backend application
CMD ["node", "server.js"]
