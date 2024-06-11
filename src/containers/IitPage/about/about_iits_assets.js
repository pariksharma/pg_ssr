import React from 'react';

import IIT_kharagpur from '../IITs/IIT_kharagpur.js';

import IIT_bombay from '../IITs/IIT_bombay.js';
import IIT_madras from '../IITs/IIT_madras.js';
import IIT_kanpur from '../IITs/IIT_kanpur.js';
import IIT_delhi from '../IITs/IIT_delhi.js';
import IIT_gandhinagar from '../IITs/IIT_gandhinagar.js';
import IIT_roorkee from '../IITs/IIT_roorkee.js';
import IIT_ropar from '../IITs/IIT_ropar.js';
import IIT_bhubaneswar from '../IITs/IIT_bhubaneswar.js';
import IIT_hyderabad from '../IITs/IIT_hyderabad.js';
import IIT_jodhpur from '../IITs/IIT_jodhpur.js';
import IIT_patna from '../IITs/IIT_patna.js';
import IIT_indore from '../IITs/IIT_indore.js';
import IIT_mandi from '../IITs/IIT_mandi.js';
import IIT_varanasi from '../IITs/IIT_varanasi.js';
import IIT_palakkad from '../IITs/IIT_palakkad.js';
import IIT_tirupati from '../IITs/IIT_tirupati.js';
import IIT_dhanbad from '../IITs/IIT_dhanbad.js';
import IIT_bhilai from '../IITs/IIT_bhilai.js';
import IIT_dharwad from '../IITs/IIT_dharwad.js';
import IIT_jammu from '../IITs/IIT_jammu.js';
import IIT_goa from '../IITs/IIT_goa.js';


const kharagpur_img = '/assets/IIT_images/iit-kharagpur.png'
const bombay_img = '/assets/IIT_images/iit-bombay.png';
const madras_img = '/assets/IIT_images/iit-madras.png';
const kanpur_img = '/assets/IIT_images/iit-kanpur.png';
const delhi_img = '/assets/IIT_images/iit-delhi.png';
const guwahati_img = '/assets/IIT_images/iit-guwahati.png';
const roorkee_img = '/assets/IIT_images/iit-roorkee.png';
const roper_img = '/assets/IIT_images/iit-roper.jpg';
const bhubaneswar_img = '/assets/IIT_images/iit-bhubaneswar.png';
const gandhinagar_img = '/assets/IIT_images/iit-gandhinagar.png';
const hydra_img = '/assets/IIT_images/iit-hydra.png';
const jodhpur_img = '/assets/IIT_images/iit-jodhpur.png';
const patna_img = '/assets/IIT_images/iit-patna.png';
const indore_img = '/assets/IIT_images/iit-indore.png';
const mandi_img = '/assets/IIT_images/iit-mandi.png';
const bhu_img = '/assets/IIT_images/iit-bhu.jpg';
const palakkad_img = '/assets/IIT_images/iit-palakkad.png';
const tirupati_img = '/assets/IIT_images/iit-tirupati.png';
const dhanbad_img = '/assets/IIT_images/iit-dhanbad.png';
const bhilai_img = '/assets/IIT_images/iit-bhilai.png';
const dharwad_img = '/assets/IIT_images/iit-dharwad.png';
const pre_img = '/assets/IIT_images/iit-pre.png';
const goa_img = '/assets/IIT_images/iit-goa.png';

const IIT_Kharagpur_Cover = '/assets/IIT_images/IIT-Kharagpur.jpg'



const About_iits_assets = [
    {
        to: 'iit-kharagpur',
        img: kharagpur_img,
        text: 'IIT Kharagpur',
        page: <IIT_kharagpur />,
        coverImage: IIT_Kharagpur_Cover
    },
    {
        to: 'iit-bombay',
        img: bombay_img,
        text: 'IIT Bombay',
        page: <IIT_bombay />
    },
    {
        to: 'iit-madras',
        img: madras_img,
        text: 'IIT Madras',
        page: <IIT_madras />
    },
    {
        to: 'iit-kanpur',
        img: kanpur_img,
        text: 'IIT Kanpur',
        page: <IIT_kanpur />
    },
    {
        to: 'iit-delhi',
        img: delhi_img,
        text: 'IIT Delhi',
        page: <IIT_delhi />
    },
    {
        to: 'iit-guwahati',
        img: guwahati_img,
        text: 'IIT Guwahati',
        page: <IIT_gandhinagar />
    },
    {
        to: 'iit-roorkee',
        img: roorkee_img,
        text: 'IIT Roorkee',
        page: <IIT_roorkee />
    },
    {
        to: 'iit-ropar',
        img: roper_img,
        text: 'IIT Ropar',
        page: <IIT_ropar />
    },
    {
        to: 'iit-bhubaneswar',
        img: bhubaneswar_img,
        text: 'IIT Bhubaneswar',
        page: <IIT_bhubaneswar />
    },
    {
        to: 'iit-gandhinagar',
        img: gandhinagar_img,
        text: 'IIT Gandhinagar',
        page: <IIT_gandhinagar />
    },
    {
        to: 'iit-hyderabad',
        img: hydra_img,
        text: 'IIT Hyderabad',
        page: <IIT_hyderabad />
    },
    {
        to: 'iit-jodhpur',
        img: jodhpur_img,
        text: 'IIT Jodhpur',
        page: <IIT_jodhpur />
    },
    {
        to: 'iit-patna',
        img: patna_img,
        text: 'IIT Patna',
        page: <IIT_patna />
    },
    {
        to: 'iit-indore',
        img: indore_img,
        text: 'IIT Indore',
        page: <IIT_indore />
    },
    {
        to: 'iit-mandi',
        img: mandi_img,
        text: 'IIT Mandi',
        page: <IIT_mandi />
    },
    {
        to: 'iit-varanasi',
        img: bhu_img,
        text: 'IIT Varanasi',
        page: <IIT_varanasi />
    },
    {
        to: 'iit-palakkad',
        img: palakkad_img,
        text: 'IIT Palakkad',
        page: <IIT_palakkad />
    },
    {
        to: 'iit-tirupati',
        img: tirupati_img,
        text: 'IIT Tirupati',
        page: <IIT_tirupati />
    },
    {
        to: 'iit-dhanbad',
        img: dhanbad_img,
        text: 'IIT Dhanbad',
        page: <IIT_dhanbad />
    },
    {
        to: 'iit-bhilai',
        img: bhilai_img,
        text: 'IIT Bhilai',
        page: <IIT_bhilai />
    },
    {
        to: 'iit-dharwad',
        img: dharwad_img,
        text: 'IIT Dharwad',
        page: <IIT_dharwad />
    },
    {
        to: 'iit-jammu',
        img: pre_img,
        text: 'IIT Jammu',
        page: <IIT_jammu />
    },
    {
        to: 'iit-goa',
        img: goa_img,
        text: 'IIT Goa',
        page: <IIT_goa />
    }
]

export default About_iits_assets;