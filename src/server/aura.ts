
import { imageValues } from "@/consts/aura-values";
import axios from "axios";
import { getUser, upsertUser } from "./supabase";

export async function calculateAura(username: string, avatar_url: string) {
    console.log(process.env.XIMILAR_KEY)
    const response = await axios.post(
        'https://api.ximilar.com/photo/tags/v2/tags',
        {
            'records': [
                {
                    '_url': avatar_url
                }
            ]
        },
        {
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'Token ' + process.env.XIMILAR_KEY
            }
        }
    );

    var aura = 0

    var imageValueArray: any = []
    var nameValueArray: any = []

    response.data.records[0]._tags.forEach((tag: any) => {
        const found = imageValues.find((element) => element.name == tag.name);
        if (found && tag.prob > 0.6) {
            aura += Math.round(tag.prob * found.value)
            imageValueArray.push({ name: tag.name, value: Math.round(tag.prob * found.value), label: found.label })
        }
    });

    if (checkCase(username) === 'Lowercase') {
        nameValueArray.push({ value: 10, label: 'Lowercase bonus' })
        aura += 10
    }

    if (checkCase(username) === 'Uppercase') {
        nameValueArray.push({ value: -50, label: 'Uppercase debuff' })
        aura -= 50
    }

    if (username.indexOf('69') > -1) {
        nameValueArray.push({ value: 69, label: '69 bonus' })
        aura += 69
    }

    if (username.indexOf('.') > -1) {
        nameValueArray.push({ value: 18, label: 'Dot swag' })
        aura += 18
    }

    if (username.indexOf('333') > -1 || username.indexOf('666') > -1) {
        nameValueArray.push({ value: 9, label: 'Triple number swag' })
        aura += 9
    }

    const randomAura = Math.floor(Math.random() * 100 - 20)

    aura += randomAura

    nameValueArray.push({ value: randomAura, label: "God's will" })

    const currentUser = await getUser(username)

    const updatedAura = currentUser.aura - (currentUser.aura_base - aura)

    console.log(aura)

    await upsertUser({ username: username, name_values: nameValueArray, image_values: imageValueArray, aura_base: aura, aura: updatedAura })

    return { aura: aura, imageValues: imageValueArray }
}

function checkCase(text: string) {
    if (text ===
        text.toUpperCase()) {
        return 'Uppercase';
    } else if (text ===
        text.toLowerCase()) {
        return 'Lowercase';
    } else {
        return 'Mixed case';
    }
}