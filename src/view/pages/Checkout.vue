<script>
/* eslint-disable */
</script>
<template>
<v-card flat outlined>
    <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
            <p>&nbsp;</p>

            <v-row>
                <v-col cols="12" sm="12" md="8">
                    <v-text-field :rules="nameRules" label="Full Name *" clearable required></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" sm="12" md="8">
                    <v-text-field :counter="7" :rules="phoneRules" label="Phone *" clearable></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" sm="12">
                    <v-textarea name="input-7-1" label="Street address *" value="" hint="Hint text" clearable></v-textarea>
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="12" sm="12" md="3">
                    <v-text-field label="Entrance" clearable></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="3">
                    <v-text-field label="Floor" clearable></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="3">
                    <v-text-field label="Appartment" clearable></v-text-field>
                </v-col>
                <v-col cols="3" sm="12" md="3">
                    <v-text-field label="Security code" clearable></v-text-field>
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="12" sm="8">
                    <v-text-field v-model="email" :rules="emailRules" label="E-mail" clearable required></v-text-field>
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="12" sm="12">
                    <v-simple-table>
                        <template v-slot:default>
                            <thead>
                                <tr>
                                    <th class="text-left">
                                        Addresses
                                    </th>
                                    <th class="text-left">
                                        <button data-v-cf56a090="" type="button" class="btn btn-light right">
                                            Add new
                                        </button>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item in desserts" :key="item.name">
                                    <td colspan="2">{{ item.name }}</td>
                                </tr>
                            </tbody>
                        </template>
                    </v-simple-table>
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="12" sm="12">
                    <v-textarea clearable name="input-7-1" label="Do we need additionasl instruqtions to find this location?" value="" hint="Big green wooden door"></v-textarea>
                </v-col>
            </v-row>

            
        </v-form>

    </v-card-text>
</v-card>
</template>

<script>
export default {
    data() {
        return {
            valid: false,
            name: '',
            nameRules: [
                v => !!v || 'Full Name is required',
            ],
            phone: '',
            phoneRules: [
                v => !!v || 'Phone is required',
                v => (v && v.length >= 9) || 'Phone must be more than 9 characters',
            ],
            billing_address_1: '',
            billing_address_1Rules: [
                v => !!v || 'House number and street name is required',
                v => (v && v.length <= 10) || 'House number and street must be less than 10 characters',
            ],
            email: '',
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
            ],

            select: true,

            checkbox: false,
            desserts: [{
                    name: '215 Nutsubidze str.',
                    calories: 159,
                },
                {
                    name: '24 Agmashenebeli ave',
                    calories: 237,
                },
            ],
        }
    }
}
</script>