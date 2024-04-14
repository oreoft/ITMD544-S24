// src/entity/User.js
const EntitySchema = require("typeorm").EntitySchema;

module.exports = new EntitySchema({
    name: "User", // 实体名称
    tableName: "user", // 表名
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        uid: {
            type: "int",
            default: 0
        },
        user_name: {
            type: "varchar",
            length: 128
        },
        token: {
            type: "varchar",
            length: 128
        },
        mtime: {
            type: "text",
            default: () => "CURRENT_TIMESTAMP",
            onUpdate: "CURRENT_TIMESTAMP"
        },
        ctime: {
            type: "text",
            default: () => "CURRENT_TIMESTAMP"
        }
    },
    indices: [
        {
            name: "user_ix_token",
            columns: ["token"]
        },
        {
            name: "user_ix_mtime",
            columns: ["mtime"]
        },
        {
            name: "user_ix_ctime",
            columns: ["ctime"]
        }
    ]
});
