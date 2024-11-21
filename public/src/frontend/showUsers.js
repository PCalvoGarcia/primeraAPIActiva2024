"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
document.addEventListener("DOMContentLoaded", () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield axios.get("http://localhost:3000/api/v1/users");
    let htmlUsers = "<table><thead><td>Nombre</td><td>Apellido</td><td>Nombre usuario</td><td>Email</td><td>Actualizar</td><td>Eliminar</td></thead>";
    result.data.forEach((user) => { htmlUsers += `<tr><td>${user.name}</td><td>${user.first_surname}</td><td>${user.userName}</td><td>${user.email}</td><td><img class="update-button" id="update-${user.id}" width="8px" src="../../media/icon/lapiz.png"></td><td><img class="delete-button" id="delete-${user.id}" width="8px" src="../../media/icon/basura.png"></td></tr>`; });
    htmlUsers += "</table>";
    document.getElementById("users").innerHTML = htmlUsers;
    document.querySelectorAll(".delete-button").forEach((button) => {
        button.addEventListener("click", (e) => __awaiter(void 0, void 0, void 0, function* () {
            const id = e.target.id.split("-")[1];
            const result = yield axios.delete(`http://localhost:3000/api/v1/users/${id}`);
            location.reload();
        }));
    });
}));
