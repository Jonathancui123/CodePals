import React, { Component } from 'react';
import AceEditor from 'react-ace';
import "./editor.css"
import "ace-builds/src-noconflict/theme-tomorrow_night";
import "../utils/modeImport";

export default class Editor extends Component {

    componentDidMount(){
        // Firebase configuration for real-time collaboration on firepad
        var firebaseConfig = {
            apiKey: "AIzaSyAceJM2eYvADgHBHtwCFl1EJjdQlGBzJFk",
            authDomain: "codepals-11647.firebaseapp.com",
            databaseURL: "https://codepals-11647.firebaseio.com",
            projectId: "codepals-11647",
            storageBucket: "codepals-11647.appspot.com",
            messagingSenderId: "434011141059",
            appId: "1:434011141059:web:da6f150db2f7f67563c376"
        };
        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
        //// Get Firebase Database reference.
        var firepadRef = this.getRef();      

        //// Create ACE
        var editor = ace.edit("firepad-container");
        editor.setTheme("ace/theme/textmate");
        var session = editor.getSession();
        session.setUseWrapMode(true);
        session.setUseWorker(false);
        session.setMode("ace/mode/javascript");

        //// Create Firepad.
        var firepad = Firepad.fromACE(firepadRef, editor, {
            defaultText: '// JavaScript Editing with Firepad!\nfunction go() {\n  var message = "Hello, world.";\n  console.log(message);\n}'
        });
    }

    render() {
        
        return (
            <div 
            id="firepad-container"
            style={{
                height: '80vh',
                margin: '0 20px 0 20px'
            }}>
                {/* <AceEditor
                    focus //Autofocus
                    placeholder={this.props.placeholder}
                    value={this.props.value}
                    onChange={this.props.onChange}
                    mode={this.props.mode}
                    theme='tomorrow_night'
                    commands={[
                        {
                            name: 'save',
                            bindKey: { win: 'Ctrl-s', mac: 'Command-s' },
                            exec: this.props.submit
                        }
                    ]}
                    name="paste-pal-editor"
                    showGutter={false}
                    editorProps={{ $blockScrolling: true }}
                    wrapEnabled={true}
                    showPrintMargin={false}
                    height={"100%"} //TODO: Implement dynamic height with CSS -Tony
                    width={"100%"}
                    fontSize={this.props.fontSize}
                    setOptions={{
                        "indentedSoftWrap":false,
                    }}
                    style={{
                        "fontFamily": 'Fira Code'
                    }} /> */}
            </div>
        );
    }

    getRef() {
        var ref = firebase.database().ref();
        var hash = window.location.hash.replace(/#/g, '');
        if (hash) {
          ref = ref.child(hash);
        } else {
          ref = ref.push(); // generate unique location.
          window.location = window.location + '#' + ref.key; // add it as a hash to the URL.
        }
        if (typeof console !== 'undefined') {
          console.log('Firebase data: ', ref.toString());
        }
        return ref;
      }
}