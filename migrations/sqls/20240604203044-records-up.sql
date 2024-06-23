CREATE TABLE records (
  req_id INT PRIMARY KEY NOT NULL, 
  client TEXT,
  req_content TEXT,
  status VARCHAR(50),
  error_reason TEXT,
  file_name VARCHAR(255),
  time_stamp TIMESTAMP WITHOUT TIME ZONE,
  browser VARCHAR(255),
  user_agent TEXT
);