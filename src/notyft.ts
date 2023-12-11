import {Notyf} from 'notyf';
import 'notyf/notyf.min.css'; // for React, Vue and Svelte

const notify: Notyf = new Notyf({
    position: {
        x: 'right',
        y: 'top',
    },
    types: [
        {
            type: 'primary',
            background: '#c600d0',
            icon: {
                className: 'fas fa-bell',
                tagName: 'span',
                color: '#fff'
            },
        },
        {
            type: 'info',
            background: '#646ad0',
            icon: {
                className: 'fas fa-info-circle',
                tagName: 'span',
                color: '#fff'
            },
        },
        {
            type: 'success',
            background: '#4ad040',
            icon: {
                className: 'fas fa-check-circle',
                tagName: 'span',
                color: '#fff'
            },
        },
        {
            type: 'warning',
            background: '#d0c21b',
            icon: {
                className: 'fas fa-exclamation-triangle',
                tagName: 'span',
                color: '#fff'
            },
        },
        {
            type: 'error',
            background: '#d05454',
            icon: {
                className: 'fas fa-times',
                tagName: 'span',
                color: '#fff'
            },
        },
    ],
    dismissible: true,
    duration: 15000
});

const notification = {
    primary: function (message: string) {
        notify.open({
            type: 'primary',
            message: message
        });
    },
    info: function (message: string) {
        notify.open({
            type: 'info',
            message: message
        });
    },
    success: function (message: string) {
        notify.open({
            type: 'success',
            message: message
        });
    },
    warning: function (message: string) {
        notify.open({
            type: 'warning',
            message: message
        });
    },
    error: function (message: Event | string) {
        notify.open({
            type: 'error',
            message: message
        });
    }
};

export default notification
