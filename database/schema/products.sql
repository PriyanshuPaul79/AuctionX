CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    seller_id UUID NOT NULL, -- Assuming a 'users' table exists
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(100) NOT NULL,
    status product_status DEFAULT 'draft',
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

    -- Ensure seller_id is a valid foreign key (assuming users table exists)
    CONSTRAINT fk_seller FOREIGN KEY (seller_id) REFERENCES users(id) ON DELETE CASCADE
);