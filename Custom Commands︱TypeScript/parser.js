"use strict";
exports.__esModule = true;
var fs_1 = require("fs");
var xmldoc_1 = require("xmldoc");
var text = fs_1.readFileSync('cmd', 'utf-8');
var document = new xmldoc_1.XmlDocument(text);
console.log(document.valueWithPath("cooldown.cooldownTarget")); /*
const regexp = /\s\s+/g

if(isCustom) {

    const parser = */
/*
const isCustomCommand = text.startsWith("<!DOCTYPE COMMAND>")
const isCustomEvent = text.startsWith("<!DOCTYPE EVENT>")

if(isCustomEvent) {

    let voids: [] = []

    const event = FindAndParse('<event>', text)
    const eventType = FindParseTrim('<eventType>', event)
    let execute = FindAndParse('<execute>', event)

    let actions: any[] = []
    let index: number = 0
    let more: boolean = true

    while(more) {

        const action = FindAndParse('<a', execute, '>')
        more = action ? true : false

        if(action) {

            actions[index] = action
            execute = execute.replace(`<a${action}>`, '')
            index++
        }
    }
}

if(isCustomCommand) {
    
    const regexp = /\s\s+/g
    let voids: [] = []

    
    const command = FindAndParse('<command>', text, '<command>')
    const name = FindParseTrim('<name:', text, '>')
    const commmandGroup = FindParseTrim('<commmandGroup:', text, '>')
    const usage = FindParseTrim('<usage:', text, '>').split(',')
    const accessLevel = FindAndParse('<accessLevel:', text, '>')
    const cooldown = FindAndParse('<cooldown>', text, '<cooldown>')
    const cooldownTarget = FindAndParse('<cooldownTarget:', cooldown, '>')
    const cooldownDuration = FindAndParse('<cooldownDuration:', cooldown, '>')
    const memberPermissions = FindParseTrim('<memberPermissions:', text, '>').split(',')
    const botPermissions = FindParseTrim('<botPermissions:', text, '>').split(',')

    let execute = FindAndParse('<execute>', command)
    let reactionsToLoad = true

    //console.log(NewParse(execute))
    
    while(reactionsToLoad) {

        const action = NewParse(execute)
        reactionsToLoad = action != undefined ? true : false

        if(action) {

            const type = action.actionType
            const body = action.actionBody

            execute = action.newText
            console.log(action)
        }
    }*/
/*let reactionsToLoad = true
let ifStatementActive = false
let cycleStatementActive = false
let varibles: { [key: string]: any } = {}
let actions: { (): any }[] = []
let ifActions: { (): any }[] = []
let cycleActions: { (): any }[] = []
let repeat: number

while(reactionsToLoad) {

    const action = FindAndParse('<', execute, '>')
    reactionsToLoad = action ? true : false

    if(action) {

        /*
        const actionData = action.split(":")
        const actionType = actionData[0]

        switch(actionType) {

            case 'if': {

                ifStatementActive = true;
                break;
            }

            case 'endif': {

                const currentActions = ifActions
                const array = cycleStatementActive ? cycleActions : actions
                
                array.push(
                    
                    () => {

                        if(true)
                            for(let i in currentActions)
                                currentActions[i]()
                                
                    }
                )

                ifStatementActive = false;
                ifActions = []
                break;
            }
    
            case 'for': {

                repeat = parseInt(actionData[1])
                cycleStatementActive = true;
                break;
            }

            case 'endfor': {

                const currentActions = cycleActions
                const repeatThis = repeat

                actions.push(

                    () => {

                        for(let i = 0; i < repeatThis; i++)
                            for(let j in currentActions)
                                currentActions[j]()
                    }
                )
                
                cycleStatementActive = false;
                cycleActions = []
                break;
            }

            case 'var': {

                const actionParams = actionData[1].split("=")
                const key = actionParams[0].replace(regexp, '')
                const value = actionParams[1]

                let array = []
                if(ifStatementActive == true) array = ifActions
                else if(cycleStatementActive == true) array = cycleActions
                else array = actions

                array.push (
                    () => varibles[key] = value
                )
                break;
            }

            case 'test': {

                cycleActions.push(
                    () => console.log("E")
                )
            }
        }

        execute = execute.replace(`<${action}>`, '')
    }
}

actions[0]()
/*
while(more) {

    const action = FindAndParse('<', execute, '>')
    more = action ? true : false
    if(action) {

        const a = action.split(":")

        switch(a[0]) {

            case 'if': {
                
                isIf = true;
                break;
            }

            case 'endif': {

                isIf = false;

                actions[index] = () => {

                    if(true)
                        ifFunction.forEach(val => val())
                }

                index++

                break;
            }

            case 'e': {

                if(isIf)
                    ifFunction[0] = () => {
                                        return 'e'
                                    }
                      
                break;
            }
        }

        execute = execute.replace(`<${action}>`, '')
    }
}

//console.log(`${name}\n${commmandGroup}\n${usage}\n${accessLevel}\n${cooldownTarget}\n${cooldownDuration}\n${memberPermissions}\n${botPermissions}`)
    console.log(actions[0]())*/
/*}
}

function FindParseTrim(searchString: string, text: string, searchString2?: string) {

return FindAndParse(searchString, text, searchString2)?.replace(regexp, '')
}

function FindAndParse(searchString: string, text: string, searchString2?: string) {

const index = text.indexOf(searchString)
if(index == -1)
    return undefined

const length = searchString.length
const startIndex = index + length
const endIndex = text.indexOf(searchString2 ? searchString2 : searchString, startIndex)
const parsed = text.slice(startIndex, endIndex)
text = text.substring(0, index) + text.substring(endIndex + length)

return parsed
}

function NewParse(text: string) {

let newText = text
const index = text.indexOf('<')
if(index == -1)
    return undefined
    
//console.log(`0. ${text}`)

const index1 = text.indexOf(':')
//console.log(`1. ${index1}`)

const index1_alt = text.indexOf('>')
//console.log(`2. ${index1_alt}`)

const actionType = text.substring(index + 1, index1 == -1 || index1 > index1_alt ? index1_alt : index1)
//console.log(`3. ${actionType}`)

const index3 = text.indexOf(`<${actionType}>`, index1 == -1 || index1 > index1_alt ? index1_alt : index1)
//console.log(`4. ${index3}`)

const actionArgs = index1 == -1 || index1 > index1_alt ? '' : text.substring(index1, index1_alt)
//console.log(`5. ${actionArgs}`)

const actionBody = text.substring(index1_alt + 1, index3)
//console.log(`6. ${actionBody}`)

newText = newText.replace(`<${actionType}${actionArgs}>${actionBody}<${actionType}>`, '')
/*
const index2 = text.indexOf('>')
const actionArgs = index1 == -1 ? '' : text.substring(index1, index2)
text = text.substring(index2)

const actionBody = text.substring(1, index3)*/
/*return { actionType, actionArgs, actionBody, newText }
}*/ 
