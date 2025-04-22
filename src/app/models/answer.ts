export interface Answer {
    id: number,
    question_id: number,
    answer_text: string,
    likes: number,
    dislikes: number,
    created_at: Date
}