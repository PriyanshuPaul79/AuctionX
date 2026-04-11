CREATE TABLE auctions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID NOT NULL UNIQUE, -- One auction per product at a time
    starting_price DECIMAL(12, 2) NOT NULL,
    reserve_price DECIMAL(12, 2),
    min_increment DECIMAL(12, 2) NOT NULL,
    start_time TIMESTAMP WITH TIME ZONE NOT NULL,
    end_time TIMESTAMP WITH TIME ZONE NOT NULL,
    status auction_status DEFAULT 'scheduled',
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

    -- Database level validation constraints
    CONSTRAINT fk_product_auction FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    CONSTRAINT check_positive_prices CHECK (starting_price > 0 AND min_increment > 0),
    CONSTRAINT check_reserve_price CHECK (reserve_price IS NULL OR reserve_price >= 0),
    CONSTRAINT check_timeline CHECK (end_time > start_time)
);