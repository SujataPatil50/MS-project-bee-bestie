const Feedback = require('../models/Feedback');
const Users = require('../models/Users');

const { uuid, Bcrypt, SALTROUNDS, Multer } = require('../utils/constants')

module.exports = {
    addFeedback: async (req, res) => {
        try {
            const {
                reviewFor,
                reviewBy,
                name,
                listenerName,
                dateOfService,
                review,
                rating
            } = req.body;
            console.log('req.body', req.body);
            if (!reviewFor || !reviewBy) {
                return res.json({
                    status: 400,
                    data: null,
                    message: "Plase check the entered details",
                    error: "Plase check the entered details"
                });
            }

            const findExist = await Users.find({
                _id: [reviewFor, reviewBy],
            });
            if (findExist.length < 2) {
                return res.json({
                    status: 400,
                    data: null,
                    message: "User not found",
                    error: "User not found",
                })
            }

            //find reviewFor user all past rating 
            const findReviewForUSer = await Feedback.find({
                reviewFor: reviewFor
            });
            // console.log('findReviewForUSer', findReviewForUSer);

            //add calculation for counting past marks
            let sumOfRatings = 0;
            if (findReviewForUSer.length) {
                sumOfRatings = findReviewForUSer.reduce((accumulator, review) => accumulator + review.rating, 0);
                let findAvg = sumOfRatings / findReviewForUSer.length;
                findAvg = findAvg.toPrecision(2)
                console.log("sumOfRatings", sumOfRatings, findAvg);
                const updateUser = await Users.findOneAndUpdate({ _id: reviewFor, }, { avgRating: findAvg }, {
                    returnOriginal: false//always return updated values 
                });
            }
            const addRating = {
                ...req.body,
                _id: uuid.v4()
            }
            const addFeedback = new Feedback(addRating);
            await addFeedback.save()

            return res.json({
                status: 200,
                data: addFeedback,
                message: "Feedback added Successfully",
                error: null,
            })
        } catch (error) {
            console.log(error);
            return res.json({
                status: 500,
                data: null,
                message: "Something went wrong",
                error: error
            });
        }
    },
    getUserReviews: async (req, res) => {

        try {
            const { userId, skip, limit } = req.query
            if (!userId) {
                return res.json({
                    status: 400,
                    data: null,
                    message: "userId are required",
                    error: "userId are required"
                });
            }
            const findExistUser = await Users.findOne({
                _id: userId,
            });
            if (!findExistUser) {
                return res.json({
                    status: 400,
                    data: null,
                    message: "User not found",
                    error: "User not found"
                });
            }
            const reviews = await Feedback.find({
                reviewFor: userId
            }).limit(limit).skip(skip).sort({ createdAt: -1 })

            const reviewsCount = await Feedback.count({
                reviewFor: userId
            })
            return res.json({
                status: 200,
                data: reviews || [],
                count: reviewsCount,
                averageRating: findExistUser.avgRating,
                message: null,
                error: null,
            })
        } catch (error) {
            console.log(error);
            return res.json({
                status: 500,
                data: null,
                message: "Something went wrong",
                error: error
            });
        }
    }

};