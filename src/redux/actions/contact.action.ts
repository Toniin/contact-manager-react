import {createAsyncThunk} from "@reduxjs/toolkit";
import {Contact} from "@/models/contact.model";
import {contactsAPI} from "@/utils/axios";
import {phoneFormatInternational_FR_fr, phoneFormatLocal_FR_fr} from "@/utils/phone.validator";

export const addContact = createAsyncThunk(
    'addContact',
    (newContact: Contact) => {
        return contactsAPI.post("/add", JSON.stringify(newContact))
            .then(response => response.data)
            .catch(error => error.response.data);
    })

export const getContacts = createAsyncThunk(
    'getContacts',
    () => {
        return contactsAPI.get("")
            .then(response => {
                return response.data.map((contact: Contact) => ({
                    name: contact.name,
                    phoneNumber: phoneFormatLocal_FR_fr(contact.phoneNumber)
                }))
            })
    })

export const getContact = createAsyncThunk(
    'getContact',
    (phoneNumber: string) => {
        return contactsAPI.get(`/find/${phoneNumber}`)
            .then(response => ({
                name: response.data.name,
                phoneNumber: phoneFormatLocal_FR_fr(response.data.phoneNumber)
            }))
            .catch(error => error.response.data);
    })

export const deleteContact = createAsyncThunk(
    'deleteContact',
    (phoneNumber: string) => {
        const phone = phoneFormatInternational_FR_fr(phoneNumber)

        return contactsAPI.delete(`/delete/${phone}`)
            .then(response => response.data)
            .catch(error => error.response.data)
    })

export const renameContact = createAsyncThunk(
    'renameContact',
    (renamedContact: Contact) => {
        return contactsAPI.put(`/update/${renamedContact.phoneNumber}`, JSON.stringify(renamedContact))
            .then(response => response.data)
            .catch(error => error.response.data);
    })