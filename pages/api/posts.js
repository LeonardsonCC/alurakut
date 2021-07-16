import { SiteClient } from 'datocms-client';

export default async function server(request, response) {
    if(request.method === 'POST') {
        const TOKEN = process.env.DATO_WRITE_KEY;
        const client = new SiteClient(TOKEN);

        // Validar os dados, antes de sair cadastrando
        const data = request.body;
        if (!data.text) {
            response.status(400).json({
                error: "Certifique-se de que todos os campos tenham sido preenchidos",
            });
            return;
        }

        const newRegister = await client.items.create({
            itemType: "972881",
            ...request.body,
        })

        response.json({
            newRegister: newRegister,
        })
        return;
    }

    response.status(404).json({
        message: 'Nada para ver aqui, jovem'
    })
}