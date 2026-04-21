export type AuctionStatus = 'LIVE' | 'ENDING_SOON' | 'UPCOMING' | 'CLOSED' | 'WON' | 'OUTBID';

export interface Auction {
  id: string;
  title: string;
  description: string;
  image: string;
  seller: {
    name: string;
    avatar: string;
    isVerified: boolean;
    rating: number;
    memberSince: string;
    reviewCount: number;
  };
  currentBid: number;
  bidCount: number;
  uniqueBidders: number;
  participantCount: number;
  endTime: string;
  status: AuctionStatus;
  category: string;
  condition: 'New' | 'Like New' | 'Good' | 'Fair';
  startingPrice: number;
}

export interface Bid {
  id: string;
  bidderName: string;
  amount: number;
  time: string;
  timestamp: string;
  isUser?: boolean;
}

export interface Notification {
  id: string;
  type: 'bid' | 'outbid' | 'won' | 'system';
  title: string;
  description: string;
  timestamp: string;
  isRead: boolean;
}
