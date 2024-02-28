import contactsRepo from "@/dao/contactsRepository";

export default async function handler(req, res) {
    const {uuid} = req.query;

    switch (req.method) {
        case 'GET':
            const contact = await contactsRepo.findById(uuid);
            res.status(200).json({contact: contact});
            break;
        case 'POST':
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
