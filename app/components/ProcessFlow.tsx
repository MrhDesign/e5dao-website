import Icon from './Icon';
import useContent from '../../lib/useContent';

interface ProcessFlowProps {
  className?: string;
}

interface ProcessStepData {
  id: number;
  icon: string;
  title: string;
  description: string;
  stepNumber: string;
}

export default function ProcessFlow({ className = "" }: ProcessFlowProps) {
  const { getContent } = useContent();

  // 获取流程数据
  const processSteps: ProcessStepData[] = getContent('customization.process.steps') || [];

  return (
    <div className={`lg:space-y-2 space-y-0 ${className}`}>
      {processSteps.map((step) => {
        const stepNum = parseInt(step.stepNumber);
        const isOddStep = stepNum % 2 === 1;

        return (
          <div key={step.id}>
            <div className="hidden lg:flex items-center w-full">
              {/* Step Container */}
              {isOddStep ? (
                // 奇数步骤：Icon在前，Step在后
                <>
                  {/* Icon Circle */}
                  <div className="flex-shrink-0">
                    <div className="w-24 h-24 rounded-full border-2 border-border-one bg-fill-one flex items-center justify-center">
                      <Icon name={step.icon} className="text-[44px] text-text-black" />
                    </div>
                  </div>

                  {/* Main Content Box with Arrow Shape */}
                  <div className="bg-[url('/images/contact-border-l.png')] bg-cover bg-left bg-no-repeat w-[428px] h-[114px] flex items-center">
                    {/* Content */}
                    <div className='w-[314px] h-[94px] pl-9 py-2'>
                      <h3 className="text-xl font-medium text-black">
                        {step.title}
                      </h3>
                      <p className="text-base text-text-display leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* Step Number */}
                  <div className="text-left ml-6">
                    <div className="text-3xl font-medium text-black mb-1">
                      {step.stepNumber.padStart(2, '0')}<br />
                      STEP
                    </div>
                  </div>
                </>
              ) : (
                // 偶数步骤：Step在前，Icon在后
                <>
                  {/* Step Number */}
                  <div className="text-right mr-6">
                    <div className="text-3xl font-medium text-black mb-1">
                      {step.stepNumber.padStart(2, '0')}<br />
                      STEP
                    </div>
                  </div>

                  {/* Main Content Box with Arrow Shape */}
                  <div className="bg-[url('/images/contact-border-r.png')] bg-cover bg-left bg-no-repeat w-[428px] h-[114px] flex items-center">
                    {/* Content */}
                    <div className='w-[314px] h-[94px] pr-9 py-2 ml-auto'>
                      <h3 className="text-xl font-medium text-black text-right">
                        {step.title}
                      </h3>
                      <p className="text-base text-text-display leading-relaxed text-right">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* Icon Circle */}
                  <div className="flex-shrink-0">
                    <div className="w-24 h-24 rounded-full border-2 border-border-one bg-fill-one flex items-center justify-center">
                      <Icon name={step.icon} className="text-[44px] text-text-black" />
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="lg:hidden flex items-center w-full">
              {/* Icon Circle */}
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-full border-2 border-border-one bg-fill-one flex items-center justify-center">
                  <Icon name={step.icon} className="text-[28px] text-text-black" />
                </div>
              </div>
              {/* Main Content Box */}
              <div className="flex items-center">
                {/* Content */}
                <div className='px-5 py-2'>
                  <h3 className="text-xl  text-black">
                    {step.stepNumber.padStart(2, '0')}.
                      {step.title}
                  </h3>
                  <p className="text-base text-text-display leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}