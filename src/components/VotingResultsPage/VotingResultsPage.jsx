import React from 'react'
import './VotingResultsPage.css'
import Header from '../Header/Header'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { NotificationManager } from 'react-notifications'

function VotingResultsPage() {
    const {register, formState: {errors, isValid}, handleSubmit, reset} = useForm({mode: 'onSubmit'})
    const navigate = useNavigate()
    const onSubmit = (data) =>{
        if(data)
            {
            let countVoters = Number(data.forAnswers_first)+Number(data.againstAnswers_first)+Number(data.neutralAnswers_first);
			let result = 100*Number(data.forAnswers_first)/(countVoters)>countVoters/2+1;                         
            if(result) NotificationManager.success("Первый вопрос будет выставлен на обсуждение.","Вопрос №1", 5000)
			countVoters = Number(data.forAnswers_second)+Number(data.againstAnswers_second)+Number(data.neutralAnswers_second);
			result = 100*Number(data.forAnswers_second)/(countVoters)>countVoters/2+1;  
            if(result) NotificationManager.success("Второй вопрос будет выставлен на обсуждение.","Вопрос №2",5000)			
			NotificationManager.success("Протокол создан успешно","Выполнено", 5000)
			NotificationManager.success("Уведомления успешно отправлены","Выполнено", 5000)

            setTimeout(()=>{navigate('/meetingresult', {  })},5000) 
            
        }
        //alert(JSON.stringify(data.questionsSelection))
        //reset() сброс данных формы
      }
    return (
    <div>
        <Header fio={'Председателев П.П.'} snt={'СНТ1'}/>
        <div className="main_container_votingResultsPage">    
          <div className="form_container_votingResultsPage">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h1 className='headerText_votingResultsPage'>Введите результаты голосования заседания правления</h1>
            <div className="voting_container_votingResultsPage">
            <h4 className='voting_text_votingResultsPage'>1. Утверждение финансово-экономического обоснования взносов на 2023г. финансовый год</h4>
            <h5>За</h5><input type='text' className='inputText_votingResultsPage' placeholder='Количество голосов' {...register('forAnswers_first',{required: 'Введите количество голосов'})}/>
            <h5>Против</h5><input type='text' className='inputText_votingResultsPage' placeholder='Количество голосов' {...register('againstAnswers_first',{required: 'Введите количество голосов'})}/>
            <h5>Воздержались</h5><input type='text' className='inputText_votingResultsPage' placeholder='Количество голосов' {...register('neutralAnswers_first',{required: 'Введите количество голосов'})}/>          
            
            <h4 className='voting_text_votingResultsPage'>2. Утверждение приходно-расходной сметы товарищества на 2023г. финансовый год</h4>
            <h5>За</h5> <input type='text' className='inputText_votingResultsPage' placeholder='Количество голосов' {...register('forAnswers_second',{required: 'Введите количество голосов'})}/>
            <h5>Против</h5><input type='text' className='inputText_votingResultsPage' placeholder='Количество голосов' {...register('againstAnswers_second',{required: 'Введите количество голосов'})}/>
            <h5>Воздержались</h5><input type='text' className='inputText_votingResultsPage' placeholder='Количество голосов' {...register('neutralAnswers_second',{required: 'Введите количество голосов'})}/>  
            </div>         
            <div className="votingResultsPage_btn_container">
            <input type='submit' className='btn_votingResultsPage' value="Создать протокол и уведомление"/>
            </div>       
          </form>    
          </div>
        </div>
    </div>
  )
}

export default VotingResultsPage