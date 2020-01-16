import React, { Component } from 'react';
import PageTemplate from './PageTemplate';
import TodoInput from './TodoInput';
import TodoList from './TodoList';
import IterationPractice from '../IterationPractice';

class App extends Component {
    render() {
        return (
            <>
            <div>
                <PageTemplate>
                    <TodoInput/>
                    <TodoList/>
                </PageTemplate>
            </div>
            <div>
                <IterationPractice></IterationPractice>
            </div>
            </>
        );
    }
}
export default App;