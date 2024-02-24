CREATE DATABASE unethicaljokes;

CREATE TABLE users(
    user_id UUID DEFAULT uuid_generate_v4(),
    user_name VARCHAR(20) NOT NULL UNIQUE,
    user_email VARCHAR(255) NOT NULL UNIQUE,
    user_password TEXT NOT NULL,
    user_type NUMERIC DEFAULT '0' CHECK(user_type > -1 OR user_type <= 6),
    user_confirm BOOLEAN NOT NULL DEFAULT FALSE,
    user_approved BOOLEAN NOT NULL DEFAULT FALSE,
    user_created TIMESTAMP NOT NULL DEFAULT NOW(),
    user_updated TIMESTAMP,
    confirmed_date TIMESTAMP,
    approved_date TIMESTAMP,
    approved_by UUID,
    PRIMARY KEY(user_id),
    FOREIGN KEY(approved_by) REFERENCES users(user_id)
);

-- 0 normal user
-- 1 mod user
-- 2 admin user
-- 3 head admin
-- 4 shadow user/ban
-- 5 ban user
-- 6 deleted user

CREATE TABLE logs(
    log_id UUID DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    type VARCHAR(30) NOT NULL,
    user_agent VARCHAR(255) NOT NULL,
    ip_address INET NOT NULL,
    date TIMESTAMP NOT NULL DEFAULT NOW(),
    PRIMARY KEY(log_id)
);