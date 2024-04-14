// src/entity/QARecord.js
const EntitySchema = require("typeorm").EntitySchema;

module.exports = new EntitySchema({
    name: "QARecord",
    tableName: "qa_record",
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
        question: {
            type: "varchar",
            length: 500
        },
        answer: {
            type: "varchar",
            length: 500
        },
        date: {
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
            name: "qa_record_ix_mtime",
            columns: ["mtime"]
        },
        {
            name: "qa_record_ix_uid_date",
            columns: ["uid", "date"]
        },
        {
            name: "qa_record_ix_ctime",
            columns: ["ctime"]
        }
    ]
});
