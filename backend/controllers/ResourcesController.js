const Resources = require('../models/Resources');
const { uuid, Bcrypt, SALTROUNDS, Multer } = require('../utils/constants')
/* image upload */
const imageStorage = Multer.diskStorage({
    limits: {
        fileSize: 10000000,//10mb
    },
    destination: (req, file, cb) => {
        cb(null, "./resourcesImages");
    },
    filename: (req, file, cb) => {
        // const name = file.originalname.toLowerCase();
        const getFileName = file.mimetype.split('/');
        console.log(getFileName);
        const name = `${Date.now()}.${getFileName[1]}`
        cb(null, name);
    },
});
var uploadImage = Multer({ storage: imageStorage }).single("resourcesImages");

module.exports = {

    addResources: async (req, res) => {
        try {
            const { title, type, description } = req.body;
            if (!type || !title) {
                return res.json({
                    status: 400,
                    data: null,
                    message: "Type and Title are required",
                    error: "Type and Title are required"
                });
            }
            //create process
            const createObj = {
                ...req.body,
                _id: uuid.v4(),
            };
            const addResources = new Resources(createObj);
            await addResources.save()

            return res.json({
                status: 200,
                data: addResources,
                message: "Resources Created Successfully",
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
    updateResources: async (req, res) => {
        try {
            const { id, title, type, image, description } = req.body;
            if (!id || !type || !title) {
                return res.json({
                    status: 400,
                    data: null,
                    message: "id, type and Title are required",
                    error: "id, type and Title are required"
                });
            }
            //check requested Resources exist or not
            const findExist = await Resources.findById({ _id: id })
            if (!findExist) {
                return res.json({
                    status: 400,
                    data: null,
                    message: "Resources not found",
                    error: "Resources not found"
                });
            }
            const updateResources = await Resources.findOneAndUpdate({ _id: id, }, req.body, {
                returnOriginal: false//always return updated values 
            });
            return res.json({
                status: 200,
                data: updateResources,
                message: "Resources Created Successfully",
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
    getResourcesById: async (req, res) => {
        try {
            const { id } = req.query;
            if (!id) {
                return res.json({
                    status: 400,
                    data: null,
                    message: "id required",
                    error: "id required"
                });
            }
            //check Resources is exist or not
            const findExist = await Resources.findById({ _id: id })
            if (!findExist) {
                return res.json({
                    status: 400,
                    data: null,
                    message: "Resources not found",
                    error: "Resources not found"
                });
            }
            return res.json({
                status: 200,
                data: findExist,
                message: null,
                error: null
            })
        } catch (error) {
            return res.json({
                status: 500,
                data: null,
                message: "Something went wrong",
                error: error
            })
        }
    },
    deleteResourcesById: async (req, res) => {
        try {
            const { id } = req.query;
            if (!id) {
                return res.json({
                    status: 400,
                    data: null,
                    error: "id required."
                });
            }
            //check Resources is exist or not
            const findExist = await Resources.deleteOne({ _id: id })
            if (!findExist) {
                return res.json({
                    status: 400,
                    data: null,
                    message: "Resources not found",
                    error: "Resources not found"
                });
            }
            return res.json({
                status: 200,
                data: {},
                message: "Resources deleted successfully",
                error: null
            })
        } catch (error) {
            return res.json({
                status: 500,
                data: null,
                message: "Something went wrong",
                error: error
            })
        }
    },
    resourcesListing: async (req, res) => {
        try {
            const { limit, skip } = req.query;
            let resourcesList = []
            if (limit > 0 || skip > 0) {
                resourcesList = await Resources.find({}).limit(limit).skip(skip).sort({ createdAt: -1 })
            } else {
                resourcesList = await Resources.find({}).sort({ createdAt: -1 })
            }
            const userCounts = await Resources.count({});
            return res.json({
                status: 200,
                count: userCounts || 0,
                data: resourcesList || [],
                message: null,
                error: null
            })
        } catch (error) {
            console.log('error', error);
            return res.json({
                status: 500,
                data: null,
                message: "Something went wrong",
                error: error
            })
        }
    },
    typeWiseResourcesListing: async (req, res) => {
        try {
            const { type, limit, skip } = req.query;
            if (!type) {
                return res.json({
                    status: 400,
                    data: null,
                    message: "type required",
                    error: "type required"
                });
            }
            let resourcesList = []
            if (limit > 0 || skip > 0) {
                resourcesList = await Resources.find({ type }).limit(limit).skip(skip).sort({ createdAt: -1 })
            } else {
                resourcesList = await Resources.find({ type }).sort({ createdAt: -1 })
            }
            const userCounts = await Resources.count({ type });
            return res.json({
                status: 200,
                count: userCounts || 0,
                data: resourcesList || [],
                message: null,
                error: null
            })
        } catch (error) {
            console.log('error', error);
            return res.json({
                status: 500,
                data: null,
                message: "Something went wrong",
                error: error
            })
        }
    },
    addEditImage: async (req, res) => {
        try {
            uploadImage(req, res, async (err) => {
                console.log(req.body.id, req.file);
                if (!req.body.id || !req.file.filename) {
                    return res.json({
                        status: 400,
                        data: null,
                        message: "id and image are required",
                        error: "id and image are required"
                    });
                }
                //check requested user exist or not
                const findExist = await Resources.findById({ _id: req.body.id })
                if (!findExist) {
                    return res.json({
                        status: 400,
                        data: null,
                        message: "Resources not found",
                        error: "Resources not found"
                    });
                }
                const updateResources = await Resources.findOneAndUpdate({ _id: req.body.id, }, {
                    image: `${process.env.BACKEND_URL}/resourcesImages/${req.file.filename}`,
                }, {
                    returnOriginal: false//always return updated values 
                });
                return res.json({
                    status: 200,
                    data: updateResources || {},
                    message: "Image Updated Successfully",
                    error: null,
                })
            })
        } catch (error) {
            console.log('error', error);
            return res.json({
                status: 500,
                data: null,
                message: "Something went wrong",
                error: error
            })
        }
    }
}