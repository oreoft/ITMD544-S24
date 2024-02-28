import contactsRepo from "@/dao/contactsRepository";

function checkFieldIsEmpty(field, fieldName) {
    if (field && field.trim() === '') {
        return `Contact ${fieldName} can not be empty!`;
    }
}

export default async function handler(req, res) {
    if (req.method === 'POST') {
        let msgs = [];
        msgs.push(checkFieldIsEmpty(req.body.firstName, "firstName"));
        msgs.push(checkFieldIsEmpty(req.body.lastName, "lastName"));
        msgs = msgs.filter(e => e);
        if (msgs.length > 0) {
            res.status(400).json({msgs: msgs, status: false});
        } else {
            await contactsRepo.create(req.body);
            res.status(201).json({status: true});
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
