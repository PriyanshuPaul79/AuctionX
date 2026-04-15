const auctionService = require('../../core/services/auction.service');

/**
 * Auction Controller
 * Handles the time-bound auction logic linked to products
 */
const auctionController = {
    // POST /auctions
    async createAuction(req, res, next) {
        try {
            const userId = req.user.id;
            const auctionData = req.body;

            // Service handles: product existence check, time validation, and ownership
            const auction = await auctionService.createAuction(userId, auctionData);

            return res.status(201).json({
                success: true,
                message: 'Auction scheduled successfully',
                data: auction
            });
        } catch (error) {
            next(error);
        }
    },

    // GET /auctions/:id
    async getAuction(req, res, next) {
        try {
            const { id } = req.params;
            const auction = await auctionService.getAuctionById(id);

            return res.status(200).json({
                success: true,
                data: auction
            });
        } catch (error) {
            next(error);
        }
    },

    // PUT /auctions/:id
    async updateAuction(req, res, next) {
        try {
            const { id } = req.params;
            const userId = req.user.id;
            const updateData = req.body;

            /**
             * SENIOR NOTE: We check the state before calling the service 
             * to avoid unnecessary DB hits if the auction is already active.
             */
            const currentAuction = await auctionService.getAuctionById(id);
            
            if (currentAuction.status !== 'scheduled') {
                return res.status(403).json({
                    success: false,
                    message: 'Auctions cannot be edited once they have started or ended.'
                });
            }

            const updatedAuction = await auctionService.updateAuction(id, userId, updateData);

            return res.status(200).json({
                success: true,
                message: 'Auction updated successfully',
                data: updatedAuction
            });
        } catch (error) {
            next(error);
        }
    },

    // DELETE /auctions/:id
    async deleteAuction(req, res, next) {
        try {
            const { id } = req.params;
            const userId = req.user.id;

            const currentAuction = await auctionService.getAuctionById(id);

            if (currentAuction.status !== 'scheduled') {
                return res.status(403).json({
                    success: false,
                    message: 'Auctions cannot be cancelled once they have started.'
                });
            }

            await auctionService.deleteAuction(id, userId);

            return res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
};

module.exports = auctionController;