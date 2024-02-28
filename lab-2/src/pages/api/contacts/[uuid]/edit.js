import contactsRepo from "@/dao/contactsRepository";

function checkFieldIsEmpty(field, fieldName) {
    if (!field || field.trim() === '') {
        return `Contact ${fieldName} cannot be empty!`;
    }
}

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const {uuid} = req.query;
        let msgs = [];
        msgs.push(checkFieldIsEmpty(req.body.firstName, "firstName"));
        msgs.push(checkFieldIsEmpty(req.body.lastName, "lastName"));
        msgs = msgs.filter(e => e);

        if (msgs.length > 0) {
            res.status(400).json({msgs, status: false});
        } else {
            req.body.id = uuid;
            req.body.lastEdited = new Date().toISOString();
            await contactsRepo.update(req.body);
            res.status(200).json({status: true, message: "Contact updated successfully"});
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
