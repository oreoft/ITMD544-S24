// src/entity/DailyCheck.js
const EntitySchema = require("typeorm").EntitySchema;

module.exports = new EntitySchema({
    name: "DailyCheck",
    tableName: "daily_check",
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
        check_date: {
            type: "varchar",
            length: 32
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
            name: "daily_check_ix_mtime",
            columns: ["mtime"]
        },
        {
            name: "daily_check_ix_ctime",
            columns: ["ctime"]
        },
        {
            name: "daily_check_ix_uid_date",
            columns: ["uid", "check_date"]
        }
    ]
});
