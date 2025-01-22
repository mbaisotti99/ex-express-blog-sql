const connection = require("../data/posts_db")

const index = (req, resp) => {

    const sql = "SELECT * FROM `posts`"
    connection.query(sql, (err, posts) => {
        if (err) {
            return (
                resp.status(500).json({
                    message: "Errore interno server"
                })
            )
        } else {
            return (
                resp.status(200).json({
                    message: "Dati trovati",
                    data: posts
                })
            )
        }
    })

}

const showId = (req, resp) => {
    const id = req.params.id
    const sql = "SELECT * FROM `posts` WHERE `id` = ?"
    connection.query(sql, [id], (err, post) => {
        if (err) {
            return resp.status(500).json({
                message: "Errore Server"
            })
        } else if (post.length === 0) {
            return resp.status(404).json({
                message: "Post non trovato"
            })
        } else {
            const tagSql = `
            SELECT tags.*
            FROM tags
            JOIN post_tag
            ON tags.id = post_tag.tag_id
            JOIN posts 
            ON post_tag.post_id = posts.id
            WHERE posts.id = 3
            `
            connection.query(tagSql, [id], (err, tags) => {
                if (err) {
                    resp.status(500).json({
                        message: "Errore Server"
                    })

                } else {
                    return resp.status(200).json({
                        message: `Ecco i dettagli del post ${id}`,
                        data: [
                            ...post,
                            tags
                        ]
                    })
                }

            })
        }
    })

}

const destroy = (req, resp) => {
    const id = req.params.id
    const sql = "DELETE FROM `posts` WHERE `id` = ?"
    connection.query(sql, [id], (err) => {
        if (err) {
            return resp.status(500).json({
                message: "Errore Server"
            })
        } else {
            return resp.sendStatus(204)
        }
    })

}




module.exports = {
    showId,
    index,
    destroy,
}







