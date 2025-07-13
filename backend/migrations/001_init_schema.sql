-- Create roles table
CREATE TABLE roles (
    role_id SERIAL PRIMARY KEY,
    role_name VARCHAR(50) UNIQUE NOT NULL
);

-- Insert roles
INSERT INTO roles (role_name) VALUES ('admin'), ('pro'), ('basic'), ('free');

-- Create users table without foreign key to sites initially
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role_id INT REFERENCES roles(role_id),
    associated_site_id INT
);

-- Create sites table
CREATE TABLE sites (
    site_id SERIAL PRIMARY KEY,
    site_name VARCHAR(100) NOT NULL,
    owner_id INT REFERENCES users(user_id)
);

-- Add foreign key to users for associated_site_id
ALTER TABLE users ADD CONSTRAINT fk_associated_site FOREIGN KEY (associated_site_id) REFERENCES sites(site_id);

-- Create custom_links table
CREATE TABLE custom_links (
    link_id SERIAL PRIMARY KEY,
    site_id INT REFERENCES sites(site_id),
    link_url VARCHAR(255) UNIQUE NOT NULL
);

-- Create password_resets table
CREATE TABLE password_resets (
    reset_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    reset_token VARCHAR(255) UNIQUE NOT NULL,
    expiration_time TIMESTAMP NOT NULL
); 