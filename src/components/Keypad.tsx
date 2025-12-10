interface KeypadProps {
  onInput: (value: string) => void;
  inputValue: string;
  onMemberClick: () => void;
  onCardClick: () => void;
  onCashClick: () => void;
  onDiscountClick: () => void;
}

export function Keypad({ onInput, inputValue, onMemberClick, onCardClick, onCashClick, onDiscountClick }: KeypadProps) {
  return (
    <div className="bg-white">
      {/* Number Grid */}
      <div className="grid grid-cols-4">
        {/* Row 1 */}
        <button
          onClick={() => onInput('1')}
          className="border border-gray-300 py-4 text-2xl hover:bg-gray-50"
        >
          1
        </button>
        <button
          onClick={() => onInput('2')}
          className="border border-gray-300 py-4 text-2xl hover:bg-gray-50"
        >
          2
        </button>
        <button
          onClick={() => onInput('3')}
          className="border border-gray-300 py-4 text-2xl hover:bg-gray-50"
        >
          3
        </button>
        <button
          onClick={onCardClick}
          className="border border-gray-300 bg-orange-500 text-white py-4 hover:bg-orange-600"
        >
          刷卡
        </button>

        {/* Row 2 */}
        <button
          onClick={() => onInput('4')}
          className="border border-gray-300 py-4 text-2xl hover:bg-gray-50"
        >
          4
        </button>
        <button
          onClick={() => onInput('5')}
          className="border border-gray-300 py-4 text-2xl hover:bg-gray-50"
        >
          5
        </button>
        <button
          onClick={() => onInput('6')}
          className="border border-gray-300 py-4 text-2xl hover:bg-gray-50"
        >
          6
        </button>
        <button
          onClick={onCashClick}
          className="border border-gray-300 bg-yellow-400 py-4 hover:bg-yellow-500"
        >
          现金
        </button>

        {/* Row 3 */}
        <button
          onClick={() => onInput('7')}
          className="border border-gray-300 py-4 text-2xl hover:bg-gray-50"
        >
          7
        </button>
        <button
          onClick={() => onInput('8')}
          className="border border-gray-300 py-4 text-2xl hover:bg-gray-50"
        >
          8
        </button>
        <button
          onClick={() => onInput('9')}
          className="border border-gray-300 py-4 text-2xl hover:bg-gray-50"
        >
          9
        </button>
        <button
          onClick={() => onInput('LATER')}
          className="border border-gray-300 bg-gray-300 py-4 hover:bg-gray-400"
        >
          后付
        </button>

        {/* Row 4 */}
        <button
          onClick={() => onInput('.')}
          className="border border-gray-300 py-4 text-2xl hover:bg-gray-50"
        >
          .
        </button>
        <button
          onClick={() => onInput('0')}
          className="border border-gray-300 py-4 text-2xl hover:bg-gray-50"
        >
          0
        </button>
        <button
          onClick={() => onInput('C')}
          className="border border-gray-300 py-4 text-2xl hover:bg-gray-50"
        >
          C
        </button>
        <button
          onClick={() => onInput('RECEIPT')}
          className="border border-gray-300 bg-gray-300 py-4 hover:bg-gray-400"
        >
          小票
        </button>

        {/* Row 5 */}
        <button
          onClick={() => onInput('返回')}
          className="border border-gray-300 bg-teal-400 py-4 hover:bg-teal-500"
        >
          返回
        </button>
        <button
          onClick={onDiscountClick}
          className="border border-gray-300 py-4 hover:bg-gray-50"
        >
          折扣
        </button>
        <button
          onClick={onMemberClick}
          className="border border-gray-300 py-4 hover:bg-gray-50"
        >
          会员
        </button>
        <button
          onClick={() => onInput('DRAWER')}
          className="border border-gray-300 py-4 hover:bg-gray-50"
        >
          钱箱
        </button>
      </div>
    </div>
  );
}