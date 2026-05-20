import { NextResponse } from 'next/server'
import { z } from 'zod'

const contactSchema = z.object({
  name: z.string().min(2, 'Ime mora imeti vsaj 2 znaka'),
  email: z.string().email('Vnesite veljaven e-poštni naslov'),
  phone: z.string().optional(),
  service: z.string().min(1, 'Izberite storitev'),
  message: z.string().min(10, 'Sporočilo mora imeti vsaj 10 znakov')
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const result = contactSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        { success: false, errors: result.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    const data = result.data
    console.log('📧 New contact form submission:')
    console.log(`  Name: ${data.name}`)
    console.log(`  Email: ${data.email}`)
    console.log(`  Phone: ${data.phone || 'N/A'}`)
    console.log(`  Service: ${data.service}`)
    console.log(`  Message: ${data.message}`)

    return NextResponse.json({
      success: true,
      message: 'Hvala za vaše povpraševanje! Odgovorili vam bomo v najkrajšem možnem času.'
    })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { success: false, message: 'Prišlo je do napake. Poskusite znova.' },
      { status: 500 }
    )
  }
}
