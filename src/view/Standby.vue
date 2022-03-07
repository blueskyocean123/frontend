<template>
    <v-stepper alt-labels>
        <v-stepper-header>
            <v-stepper-step
                step="1"
                complete
            >
                Register.
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step
                :rules="[() => false]"
                step="2"
            >
                Send Mail.
                <small>Confirm your email</small>
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step 
                step="3"
            >        
                Complete!
            </v-stepper-step>
        </v-stepper-header>
    </v-stepper>
</template>