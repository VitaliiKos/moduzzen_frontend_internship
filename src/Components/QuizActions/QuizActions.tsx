import {Dispatch, FC, SetStateAction} from 'react';

interface IProps {
    company_role: string | null
    setModalVisible:Dispatch<SetStateAction<boolean>>
}

const QuizActions: FC<IProps> = ({company_role,setModalVisible}) => {

    const addNewQuiz = () => {
        setModalVisible(true)
    }


    switch (company_role) {
        case 'Owner':
            return (
                <div>
                    <button onClick={() => addNewQuiz()}>Add Quiz</button>

                </div>
            );
        case 'Admin':
            return (
                <div>
                    <button onClick={() => addNewQuiz()}>Add Quiz</button>
                </div>
            );
        default:
            return null
    }
};

export {QuizActions};