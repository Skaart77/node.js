// contacts.js
const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");
/*
 * Розкоментуй і запиши значення
 * const contactsPath = ;
 */
const contactsPath = path.join("db", "contacts.json");

// TODO: задокументувати кожну функцію
const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);

  // ...твій код. Повертає масив контактів.
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.find((item) => item.contactId === contactId);
  return result || null;
  // ...твій код. Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.contactId === contactId);
  if (index === -1) {
    return null;
  }
  const [results] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return results;
  // ...твій код. Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
};

const addContact = async (data) => {
  const contacts = await listContacts();

  const newContact = {
    id: nanoid,
    ...data,
  };
  contacts.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return newContact;
  // ...твій код. Повертає об'єкт доданого контакту.
};

module.exports = { listContacts, getContactById, removeContact, addContact };
