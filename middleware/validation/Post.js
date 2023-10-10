const Post = require("../../models/post")


const validateSubtitles = (subtitles) => {
    if (!subtitles || subtitles.length === 0) {
        throw new Error(" At least one subtitle is required")
    }
}


const validatePostTitle = async (postTitle) => {
    const existingPost = await Post.findOne({ post_title: postTitle })
    if (existingPost) {
        throw new Error("Post is already exist update it instead")
    }
}

const validateMediaSubtitle = (mediaSubtitle, subtitleSet) => {
    if (!subtitleSet.has(mediaSubtitle)) {
        throw new Error("subtitle does not exist in the list of subtitles");
    }
}


module.exports = {
    validateSubtitles,
    validateMediaSubtitle,
    validatePostTitle
}